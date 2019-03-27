const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

const models = require('../models');

// POST is registration
router.post('/register', (req, res) => {
    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    console.log(req.body)


    if (!login || !password || !passwordConfirm || !email) {
        const fields = [];
        if (!login) fields.push('login')
        if (!password) fields.push('password')

        if (!passwordConfirm) fields.push('passwordConfirm')

        res.json({
            ok: false,
            error: 'Should be no empty fields',
            fields
        });


    }  else if (!/^[a-zA-Z0-9]+$/.test(login)) {
        res.json({
            ok: false,
            error: 'Login should be in English',
            fields: ['login']
        });
    } else if ( password.length < 5) {
        res.json({
            ok: false,
            error: 'Password should be more than 5 symbols',
            fields: ['password']
        });
    }





    else if (login.length < 3 || login.length > 16) {
        res.json({
            ok: false,

            error: 'Login length from three to six characters!',
            fields: ['login']
        });
    } else if (password !== passwordConfirm) {
        res.json({
            ok: false,
            error: 'Passwords do not match',
            fields: ['password', 'passwordConfirm']
        });
    } else {
        models.User.findOne({
            login
        }).then(user => {
            if (!user) {
                bcrypt.hash(password, null, null , (err,hash) =>{
                    models.User.create({
                        email,
                        login,
                        password: hash
                    }).then(user => {
                        req.session.userId = user.id;
                        req.session.userLogin = user.login;
                            res.json({
                                ok:true
                            });

                        }).catch(err => {
                            console.log(err);
                            res.json({
                                ok:false,
                                error: 'Error, try later'
                            });
                        });
                    });

            } else {
                    res.json({
                        ok: false,
                        error:  "Name is taken",
                        fields: ['login']
                    })
                }
        })


    }


});

// post is login



router.post('/login', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    console.log(req.body)


    if (!login || !password) {
        const fields = [];
        if (!login) fields.push('login')
        if (!password) fields.push('password')


        res.json({
            ok: false,
            error: 'Should be no empty fields!',
            fields
        });


    } else {
        models.User.findOne({
            login

        }).then(user => {
            if (!user) {
              res.json({
                  ok: false ,
                  error: 'Login and password are wrong',
                  fields: ['login', 'password']

              })
            } else {
                // Load hash from your password DB.
                bcrypt.compare(password, user.password, function(err, result) {
                    // res == true
                    if (!result) {
                        res.json({
                            ok: false ,
                            error: 'Login and password are wrong',
                            fields: ['login', 'password']

                        })
                    } else {
                        //
                        req.session.userId = user.id;
                        req.session.userLogin = user.login;
                        res.json({
                            ok:true
                        })

                    }
                });
            }
        })
            .catch(err=>{
                console.log(err);
                res.json({
                    ok:false,
                    error:'Error, try later'
                })
            })

    }
    console.log(req.body)
});

router.get('/logout', (req,res)=>{
    if ( req.session) {
        req.session.destroy(() => {
            res.redirect('/')
        });
    } else {
        res.redirect('/')
    }
});

module.exports = router;
