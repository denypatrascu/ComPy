const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    submissions: {}
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;