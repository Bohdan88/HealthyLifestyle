const express = require('express');
const router = express.Router();

//const models = require('../models');





// GET for add
router.get('/add', (req, res) => {
    const id = req.session.userId;
    const login = req.session.userLogin;

    res.render('post/add', {
        user: {
            id,
            login
        }
    });
});

// post add
router.post('/add', (req, res) => {

    const title = req.body.title;
    const body = req.body.body;

        if (!title || !body) {
            const fields = [];

            if (!title) fields.push('title')
            if (!body) fields.push('body')

            res.json({
                ok: false,
                error: 'Все поля должны быть заполнены!',
                fields
            });
        }

        res.json({
                ok: true

            });


});

module.exports = router;
