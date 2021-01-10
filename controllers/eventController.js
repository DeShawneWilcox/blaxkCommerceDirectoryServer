const router = require('express').Router();
const Event = require('../db').import('../models/event');

/* *********GET ALL EVENTS********* */

router.get("/",  (req, res) => {
    Event.findAll()
    .then(events => res.status(200).json(events))
    .catch(err => res.status(500).json({ error: err}))
});

const validateSession = require('../middleware/validateSession');


/* *************EVENT CREATE*************** */

router.post('/', validateSession, (req, res) => {
    const eventEntry = {
        eventName: req.body.event.eventName,
        eventDescription: req.body.event.eventDescription,
        eventDate: req.body.event.eventDate,
        owner: req.user.id

    }
    Event.create(eventEntry)
        .then(event => res.status(200).json(event))
        .catch(err => res.status(500).json({ error: err }))
});

/* ***************EDIT EVENTS************** */

router.put("/:id", validateSession, function (req, res) {
    const editEventEntry = {
        eventName: req.body.event.eventName,
        eventDescription: req.body.event.eventDescription,
        eventDate: req.body.event.eventDate,

    };

const query = { where: { id: req.params.id, owner: req.user.id} };

Event.update(editEventEntry, query)
    .then(events => res.status(200).json({message: "Business event successfully edited."}))
    .catch((err) => res.status(500).json({error: err})); 
});

/* ***************DELETE EVENTS************** */

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id} };

    Review.destroy(query)
    .then(() => res.status(200).json({ message: "Event entry removed "}))
    .catch((err) => res.status(500).json({error: err }));
});

/* **************GET EVENTS BY BUSINESSNAME*************** */

router.get('/:businessname', function (req, res) {
    let businessName = req.params.businessName;

    Review.findAll({
        where: {businessName: businessName }
    })
        .then(reviews => res.status(200).json(reviews))
        .catch(err => res.status(500).json({ error: err }))
});


module.exports = router;
