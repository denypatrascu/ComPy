const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    title: { type: String, required: true, minlength: 6, unique: false },
    description: { type: String, required: true, minlength: 30, unique: false },
    category: { type: String, required: true, minlength: 1 },
    difficulty: { type: String, required: true, minlength: 1 },
    rating: {type: Number, required: true, default: 0}
});

const Problem = mongoose.model('Problem', problemSchema)

module.exports = Problem;