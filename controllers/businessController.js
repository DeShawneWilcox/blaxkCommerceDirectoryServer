const router = require('express').Router();
const Business = require('../db').import('../models/event');


/* *********GET ALL BUSINESSES********* */

router.get("/", (req, res) => {
    Business.findAll()
    .then(businesses => res.status(200).json(businesses))
    .catch(err => res.status(500).json({ error: err}))
});

const validateSession = require('../middleware/validateSession');


/* *************BUSINESS CREATE*************** */

router.post('/', validateSession, (req, res) => {
    const businessEntry = {
        businessOwner: req.body.business.businessOwner,
        businessName: req.body.business.businessName,
        address: req.body.business.address,
        zipcode: req.body.business.zipcode,
        businessFunction: req.body.business.businessFunction,
        owner: req.user.id
    }
    Business.create(businessEntry)
        .then(business => res.status(200).json(business))
        .catch(err => res.status(500).json({ error: err}))
});

/* ***************EDIT BUSINESS************** */

router.put("/:id", validateSession, function (req, res) {
    const editBusinessEntry = {
        businessOwner: req.body.business.owner,
        businessName: req.body.business.businessName,
        address: req.body.business.address,
        zipcode: req.body.business.zipcode,
        businessFunction: req.body.business.businessFunction
    };

const query = { where: { id: req.params.id, owner: req.user.id} };

Business.update(editBusinessEntry, query)
    .then(businesses => res.status(200).json({message: "Business successfully edited."}))
    .catch((err) => res.status(500).json({error: err}))
});

/* ***************DELETE BUSINESSES************** */

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id} };

    Business.destroy(query)
    .then(() => res.status(200).json({ message: "Business entry removed. "}))
    .catch((err) => res.status(500).json({error: err }));
});

/* **************GET BUSINESS BY BUSINESSNAME*************** */

router.get('/:businessname', function (req, res) {
    let businessName = req.params.businessName;

    Review.findAll({
        where: {businessName: businessName }
    })
        .then(reviews => res.status(200).json(reviews))
        .catch(err => res.status(500).json({ error: err }))
});
module.exports = router