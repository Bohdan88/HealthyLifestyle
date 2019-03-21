
const express = require('express');
const router = express.Router();
const moment = require('moment');

moment.locale('ru')

const models = require('../models');


 function posts(req,res) {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    //
    const perPage = 3
    const page = req.params.page || 1




  models.Post.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate('owner')
      .sort({createdAt: -1})
      .then(posts => {
          models.Post.estimatedDocumentCount()
              .then(estimatedDocumentCount => {
              res.render('archive/indexx', {
                  posts,
                  current: page,
                  pages: Math.ceil(estimatedDocumentCount / perPage),
                  user: {
                      id: userId,
                      login: userLogin
                  }
              })
          })
              .catch(() => {
                  throw new Error('Server Error')
              })
      }).catch(() => {
      throw new Error('Server Error')


  })

  }

router.get('/main', (req,res) => posts(req,res));



router.get('/archive/:page', (req, res) => posts(req,res));
// для доступа к постам

router.get('/posts/:post', async(req, res, next) => {
    const url = req.params.post.trim().replace(/ +(?= )/g, '');
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if (!url) {
        const err = new Error('not found')
        err.status = 404
        next(err)
    } else {

        try {

            const post = await models.Post.findOne({
               url
            });

            if (!post) {
                const err = new Error('not found')
                err.status = 404
                next(err)
            } else {

                const comments = await models.Comment.find({
                    post: post.id,

                    parent: {
                        $exists: false
                    }
                })
           //        //.populate({
           //        path: 'children',
           //        populate: {
           //            path: 'children',
           //            populate: {
           //                path: 'children'
           //            },

           //        }

           //    })

                console.log(comments)
                res.render('post/post', {

                    post,
                    comments,
                    moment,
                    user: {
                        id: userId ,
                        login: userLogin
                    }
                })
            }

        } catch {
            throw  new Error ('Not found')
        }


   // //    models.Post.findOne({
   //         url
   //     }).then(post => {
//
   //     });
    }

});


//  user page ( для постов )
router.get('/users/:login/:page*?', async (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    const perPage = 3
    const page = req.params.page || 1;
    const login = req.params.login;

    try {
        const user = await
            models.User.findOne({
            // берем логин от юзера
            login
        });

        const posts = await
            models.Post.find({
            //  получаем айдишник юзера по посту
            owner: user.id
        })
            .skip(perPage * page - perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

            const count  = await
                models.Post.estimatedDocumentCount({
            owner: user.id
        });

        res.render('archive/user', {
            posts,
            _user: user,
            current: page,
            pages: Math.ceil(count / perPage),
            user: {
                id: userId,
                login: userLogin
            }
        });


    } catch (error) {
        throw new Error ('Server error')
    }

  ////  models.User.findOne({
  ////      // берем логин от юзера
  ////      login
  ////  }).then(user => {
  ////      models.Post.find({
  ////          //  получаем айдишник юзера по посту
  ////          owner: user.id
  ////      })
  ////          .skip(perPage * page - perPage)
  ////          .limit(perPage)
  ////          .sort({ createdAt: -1 })
  ////          .then(posts => {
  ////              models.Post.estimatedDocumentCount({
  ////                  owner: user.id
  ////              })
  ////                  .then(count => {
  ////                      res.render('archive/user', {
  ////                          posts,
  ////                          _user: user,
  ////                          current: page,
  ////                          pages: Math.ceil(count / perPage),
  ////                          user: {
  ////                              id: userId,
  ////                              login: userLogin
  ////                          }
  ////                      });
  ////                  })
  ////                  .catch(() => {
  ////                      throw new Error('Server Error');
  ////                  });
  ////          })
  //          .catch(() => {
  //              throw new Error('Server Error');
  //          });
  //  });
});



module.exports = router;


