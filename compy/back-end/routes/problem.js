const path = require('path');
const axios = require('axios');

const router = require('express').Router();
const { Category, Problem, Submission } = require('../models');

const { Storage } = require('@google-cloud/storage');
const gcStorage = new Storage({
    keyFilename: path.join(__dirname, '../config/gcloud2-storage.json'),
    projectId: process.env.GC_2_PROJECT
});

/* Get google storage image url */
async function generateSignedUrl(filename) {
    const options = {
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60 * 60 * 60,
    };

    const [url] = await gcStorage
        .bucket(process.env.GC_2_BUCKET)
        .file(filename)
        .getSignedUrl(options);

    return url;
}

/* Get all the problems */
router.get('/', async (req, res) => {
    try {
        const problems = await Problem.find({});
        return res.status(200).json(problems);
    } catch (err) {
        return res.status(404).json({ message: 'No problems found.' })
    }
});

/* Get all categories for problems */
router.get('/category', async (req, res) => {
    try {
        const categories = await Category.find({});
        const data = categories.map(category => category.name);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(404).json({ message: 'No categories found.' })
    }
});

/* Get a problem by id */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: 'No problem found.' });

    try {
        const problem = await Problem.findById(id);
        return res.status(200).json(problem);
    } catch (err) {
        return res.status(404).json({ message: 'No problem found.' })
    }
});

/* Get a problem by attachments */
router.get('/:id/attachment', async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: 'No attachment found.' });

    try {
        const problem = await Problem.findById(id);
        let results = [];
        for (const item of problem.content) {
            if (item.type !== 'attachment') continue;
            const path = [process.env.GC_2_BUCKET_UPLOADS, problem.key, item.value].join('/');
            results.push(await generateSignedUrl(path));
        }
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json({ message: 'No problem found.' })
    }
});

/* Insert a problem */
router.post('/', async (req, res) => {
   console.log(req.body);

   try {
       const problem = new Problem(req.body);
       await problem.save();
       console.log('Problem saved!');
       return res.status(201).json({ message: 'Problem created' });
   } catch (err) {
       return res.status(500).json({ error: err.message });
   }
});

/* Upload problem attachments */
router.post('/upload', async (req, res) => {
    const { key } = req.body;
    const keys = Object.keys(req.files);

    const directory = process.env.GC_2_BUCKET_UPLOADS;

    for (let index = 0; index < keys.length; index++) {
        const file = req.files[keys[index]];
        const filePath = `${directory}/${key}/${file.name}`;
        console.log(`File future location: ${filePath}`);

        const gcBucket = gcStorage.bucket(process.env.GC_2_BUCKET);
        const gcFile = gcBucket.file(filePath);
        const gcFileStream = gcFile.createWriteStream({
            resumable: false
        });

        gcFileStream
            .on('finish', async _ => {
                console.log('File uploaded!');

                if (index === key.length - 1) res.sendStatus(201);
            })
            .on('error', err => {
                console.error(err);

                if (index === key.length - 1) res.sendStatus(500);
            })
            .end(req.files[keys[index]].data)
    }
});

router.post('/submit', async (req, res) => {
    const data = req.body;
    try {
        const response = await axios.post(`${process.env.GC_FUNCTIONS}/compile_code`,
            data, {
                headers: {'Content-Type': 'application/json'}
            });
        return res.status(201).json(response.data);
    } catch (err) {
        console.log(err.response.data);
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
});

router.post('/submissions', async (req, res) => {
    const { email, problemId, results, score } = req.body;
    if (!email || !problemId || !results || !Object.keys(req.body).includes('score')) {
        return res.status(404).json({ message: 'At least one body parameter is missing.' })
    }

    try {
        let submission = await Submission.findOne({ email });
        if (!submission) {
            submission = new Submission({
                email,
                submissions: {
                    [problemId]: [{ results, score, date: new Date() }]
                }
            });
            await submission.save();
        } else {
            const submissions = submission.submissions;

            if (submissions[problemId]) {
                submissions[problemId].push({ results, score, date: new Date() })
            } else {
                submissions[problemId] = [{ results, score, date: new Date() }]
            }

            console.log(submission.submissions);

            await Submission.updateOne({ email }, submission);
        }

        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

});



module.exports = router;