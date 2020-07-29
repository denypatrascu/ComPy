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

/* Get solved problems */
router.get('/solved', async (req, res) => {
    try {
        let submissions = await Submission.find({});
        let users = [];
        let solvedProblems = [];

        /* Get the number of solved problems for every user */
        for (let i = 0; i < submissions.length; i++) {
            users.push(submissions[i].email);
            let sub = submissions[i].submissions;
            let keys = Object.keys(submissions[i].submissions);
            let solved = 0;
            for (let j = 0; j < keys.length; j++) {
                let check = false;
                for (let k = 0; k < sub[keys[j]].length; k++) {
                    if (sub[keys[j]][k].score === 100) check = true;
                }

                check ? solved += 1 : null
            }

            solvedProblems.push(solved);
        }

        /* Sort the users by the number of solved problems */
        for (let i = 0; i < solvedProblems.length; i++) {
            for (let j = i + 1; j <= solvedProblems.length; j++) {
                if (solvedProblems[i] < solvedProblems[j]) {
                    let aux = solvedProblems[i];
                    solvedProblems[i] = solvedProblems[j];
                    solvedProblems[j] = aux;

                    aux = users[i];
                    users[i] = users[j];
                    users[j] = aux;
                }
            }
        }

        return res.status(200).json({ users, solvedProblems });
    } catch (err) {
        return res.status(404).json({ message: "Something went wrong.." });
    }
});

/* Solved problems by a specific user */
router.get('/solved/:user', async (req, res) => {

    let user = req.params.user;

    try {
        let submissions = await Submission.find({});
        let solvedProblems = [];

        /* Get the number of solved problems for every user */
        for (let i = 0; i < submissions.length; i++) {
            if (user === submissions[i].email) {
                let sub = submissions[i].submissions;
                let keys = Object.keys(submissions[i].submissions);
                for (let j = 0; j < keys.length; j++) {
                    let check = false;
                    for (let k = 0; k < sub[keys[j]].length; k++) {
                        if (sub[keys[j]][k].score === 100) check = true;
                    }

                    check ? solvedProblems.push(keys[j]) : null
                }
            }
        }

        return res.status(200).json({ solvedProblems });
    } catch (err) {
        return res.status(404).json({ message: "Something went wrong.." });
    }
})

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

/* Filter problems by category and difficulty */
router.post('/filter', async (req, res) => {
    let difficulty = req.body.difficulties;
    let category = req.body.categories;


    if (difficulty.length === 0 && category.length === 0) {
        const problems = await Problem.find({});
        return res.status(200).json(problems);
    } else {
        const problems = await Problem.find({});

        if (category.length > 0 && difficulty.length > 0) {
            let possibleProblems = [];

            for (let i = 0; i < difficulty.length; i++) {
                for (let j = 0; j < problems.length; j++) {
                    if (problems[j].difficulty == difficulty[i]) {
                        possibleProblems.push(problems[j]);
                    }
                }
            }

            let finalProblems = [];
            for (let i = 0; i < category.length; i++) {
                for (let j = 0; j < possibleProblems.length; j++) {
                    for (let k = 0; k < possibleProblems[j].categories.length; k++) {
                        if (category[i] === possibleProblems[j].categories[k]) {

                            let check = false;
                            for (let l = 0; l < finalProblems.length; l++) {
                                if (finalProblems[l].title === possibleProblems[j].title) check = true;
                            }

                            if (!check) finalProblems.push(possibleProblems[j]);
                        }
                    }
                }
            }

            return res.status(200).json(finalProblems);

        } else if (category.length === 0 && difficulty.length > 0) {
            let possibleProblems = [];

            for (let i = 0; i < difficulty.length; i++) {
                for (let j = 0; j < problems.length; j++) {
                    if (problems[j].difficulty == difficulty[i]) {
                        possibleProblems.push(problems[j]);
                    }
                }
            }

            return res.status(200).json(possibleProblems);

        } else if (category.length > 0 && difficulty.length === 0) {
            let finalProblems = [];
            for (let i = 0; i < category.length; i++) {
                for (let j = 0; j < problems.length; j++) {
                    for (let k = 0; k < problems[j].categories.length; k++) {
                        if (category[i] === problems[j].categories[k]) {
                            let check = false;
                            for (let l = 0; l < finalProblems.length; l++) {
                                if (finalProblems[l].title === problems[j].title) check = true;
                            }

                            if (!check) finalProblems.push(problems[j]);
                        }
                    }
                }
            }

            return res.status(200).json(finalProblems);
        }
    }
})

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
            headers: { 'Content-Type': 'application/json' }
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

            await Submission.updateOne({ email }, submission);
        }

        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

});

module.exports = router;