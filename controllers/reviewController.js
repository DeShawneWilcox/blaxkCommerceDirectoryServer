const router = require('express').Router();
const Review = require('../db').import('../models/review');

/* *********GET ALL REVIEWS********* */

router.get("/", (req, res) => {
    Review.findAll()
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({ error: err}))
});

const validateSession = require('../middleware/validateSession');


/* *************REVIEW CREATE*************** */

router.post('/', validateSession, (req, res) => {
    const reviewEntry = {
        title: req.body.review.title,
        entry: req.body.review.entry,
        owner: req.user.id,
        businessId: req.body.review.businessid

    }
    Review.create(reviewEntry)
        .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({ error: err }))
});

/* ***************EDIT REVIEWS************** */

router.put("/:id", validateSession, function (req, res) {
    const editReviewEntry = {
        title: req.body.review.title,
        entry: req.body.review.entry
    };

const query = { where: { id: req.params.id, owner: req.user.id} };

Review.update(editReviewEntry, query)
    .then(reviews => res.status(200).json({message: "Review successfully edited."}))
    .catch((err) => res.status(500).json({error: err})); 
});

/* ***************DELETE REVIEWS************** */

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id} };

    Review.destroy(query)
    .then(() => res.status(200).json({ message: "Review entry removed. "}))
    .catch((err) => res.status(500).json({error: err }));
});

/* **************GET REVIEWS BY BUSINESS*************** */

router.get('/reviews/:businessId', function (req, res) {
    // let businessid = req.params.business.id;

    Review.findAll({
        where: {businessId: req.params.businessId }
    })
        .then(reviews => res.status(200).json(reviews))
        .catch(err => res.status(500).json({ error: err }))
});





module.exports = router;