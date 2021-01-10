const router = require('express').Router();
const User = require('../db').import('../models/user');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res) => {

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
        admin: req.body.admin,
        businessOwner: req.body.businessOwner

    })
        .then(user => {
            const token = jwt.sign({ id: user.id },
                process.env.JWT_SECRET, { expiresIn: "14d" });
            res.status(200).json({
                user: user,
                message: "The Blaxk Commerce Directory user was created.",
                sessionToken: token
            })
        })
        .catch(err => res.status(500).json({ error: err })
        );

});


router.post('/signin', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if (matches) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '14d' });
                        if (user.admin === true) {


                            res.status(200).json({
                                user: user,
                                message: "Blaxk Commerce Directory Admin user has been authenticated.",
                                sessionToken: token
                            })
                        } else {
                            if (user.businessOwner === true) {


                                res.status(200).json({
                                    user: user,
                                    message: "Blaxk Commerce Directory BusinessOwner user has been authenticated.",
                                    sessionToken: token
                                })
                            } else {
                                res.status(200).json({
                                    user: user,
                                    message: "Blaxk Commerce Directory user has been authenticated",
                                    sessionToken: token
                                })
                            }
                            
                        }



                    } else {
                        res.status(500).json({ error: "password mismatch" })
                    }
                })

            } else {
                res.status(500).json({ error: "user not found" })
            }
        })






        .catch(err => res.status(500).json({ error: "database error", err }));
});

module.exports = router;

