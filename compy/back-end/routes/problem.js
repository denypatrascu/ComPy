const router = require('express').Router();
let Problems = require('../models/problems.model');

/* Get all the problems */
router.get('/', (req, res) => {
    Problems.find({}, (err, problems) => {
        if (err) {
            res.status(404).json({ message: 'No problems found.' })
        } else {
            res.status(200).json({ message: problems })
        }
    })
        .catch(err => console.log(err));
});

/* Filter problems */



module.exports = router;