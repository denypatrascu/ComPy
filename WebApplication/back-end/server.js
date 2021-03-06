const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');

dotEnv.config();

const { Storage } = require('@google-cloud/storage');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({}));
app.use(cors());
app.use(morgan('dev'));


/* Connect to mongoose DB */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
}); 

/* Prototypes */
String.prototype.rsplit = function (sep, maxsplit) {
    const split = this.split(sep);
    return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
};

/* Cloud storage */
const cloudStorage = new Storage({
    keyFilename: path.join(__dirname, 'config/gcloud-storage.json'),
    projectId: process.env.GC_PROJECT
});

/* Delete file from cloud storage */
async function deleteFile(filename) {
    await cloudStorage
        .bucket(process.env.GC_BUCKET)
        .file(filename)
        .delete();
}

/* Get google storage image url */
async function generateSignedUrl(filename) {
    const options = {
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60 * 60 * 60,
    };

    const [url] = await cloudStorage
        .bucket(process.env.GC_BUCKET)
        .file(filename)
        .getSignedUrl(options);

    return { name: filename.rsplit('/')[2], url };
}

/* Get files from cloud storage */
async function getFilesByPrefix(prefix) {
    const options = {
        prefix: prefix,
    };

    const [files] = await cloudStorage.bucket(process.env.GC_BUCKET).getFiles(options);

    let names = [];
    for (const file of files) {
        names.push(file.name);

    }

    return names;
}

// Copies the file to the other bucket
async function copyFile(filename) {
    await cloudStorage
        .bucket(process.env.GC_BUCKET)
        .file("default/undraw_male_avatar_323b.svg")
        .copy(cloudStorage.bucket(process.env.GC_BUCKET).file(filename));

}

/* */
app.get('/', (req, res) => {
    console.log(req.method, req.originalUrl);
    res.json({ message: 'Hello World! 🤩' });
});

/* Get default profile image on register */
app.post('/default_image/:username', async (req, res) => {
    try {
        const value = await getFilesByPrefix(process.env.GC_BUCKET_DEFAULT);
        const imageUrl = await generateSignedUrl(value[1]);

        const username = req.params.username;
        const directory = process.env.GC_BUCKET_UPLOADS;
        const filePath = `${directory}/${username}/avatar.svg`;

        await copyFile(filePath);

        res.status(201).json({
            message: `Avatar uploaded!`,
            image: imageUrl
        })
    } catch (err) {
        console.log(err);
    }
})

/* Get data about user on login */
app.post('/login/:username', async (req, res) => {

    try {
        const username = req.params.username;
        const filePath = `uploads/${username}/`;

        const result = await getFilesByPrefix(filePath);

        /* If he already has a folder in bucket */
        if (result.length > 0) {
            const imageUrl = await generateSignedUrl(result[0]);
            res.status(201).json({ imageUrl });
        } else {
            /* If he doesn't, then get the default image */
            const value = await getFilesByPrefix(process.env.GC_BUCKET_DEFAULT);
            const imageUrl = await generateSignedUrl(value[1]);

            res.status(201).json({ result: imageUrl });
        }
    } catch (error) {
        res.status(500).json({ result: "Something went wrong!" });
    }
})


/* Update user's profile image */
app.post('/upload/:username', async (req, res) => {
    const file = req.files.file;
    const username = req.params.username;
    const directory = process.env.GC_BUCKET_UPLOADS;
    const filePath = `${directory}/${username}/${file.name}`;

    const gcBucket = cloudStorage.bucket(process.env.GC_BUCKET);
    const gcFile = gcBucket.file(filePath);
    const gcFileStream = gcFile.createWriteStream({
        resumable: false
    });

    gcFileStream
        .on('finish', async _ => {
            const current_avatar = `uploads/${req.params.username}/${file.name}`;
            const arr = await getFilesByPrefix(`uploads/${req.params.username}/`);

            for (const item of arr) {
                if (item !== current_avatar) {
                    await deleteFile(item);
                }
            }

            const imageUrl = await generateSignedUrl(`uploads/${req.params.username}/${file.name}`);

            res.status(201).json({
                message: `Avatar uploaded!`,
                token: imageUrl
            })
        })
        .on('error', err => {
            console.error(err);

            res.status(500).json({
                message: `Something went wrong..`
            })
        })
        .end(req.files.file.data)
});


/* Require & set routes */
const problemRouter = require('./routes/problem');

app.use('/problems', problemRouter);

app.listen(8080, () => {
    console.log("Server is running on port: 8080.");
});