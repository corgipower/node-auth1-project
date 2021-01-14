const express = require("express");
const Users = require("./auth-model");
const bcrypt = require('bcryptjs');
const {restrict} = require('./auth-middleware');

const router = express.Router();

router.get('/api/users', restrict(), async (req, res, next) => {
    try {
        users = await Users.find();
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});

router.post('/api/register', async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await Users.findByUsername(username).first();

        if(user) {
            return res.status(409).json({
                message: 'name unavailable',
            })
        }

        const newUser = await Users.add({
            username,
            password: await bcrypt.hash(password, 14),
        });

        res.status(201).json(newUser);
    }
    catch (err) {
        next(err);
    }
})

router.post('/api/login', async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await Users.findByUsername(username).first();
        const validPassword = await bcrypt.compare(password, user.password);
        if(!user || !validPassword) {
            return res.status(401).json({
                message: 'user does not exist',
            })
        }

        req.session.user = user;

        res.json({
            message: `Hello ${user.username}`,
        })
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;