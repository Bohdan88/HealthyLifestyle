const express = require('express');
const router = express.Router();


const models = require('../models');

const path = require('path')
// image

const multer = require('multer')
 // где храниться будут наши файлы
const storage = multer.diskStorage( {
    destination: (req, file, cd) => {
        cd(null, 'upload');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024},
    fileFilter: (req,file, cb) => {
        const ext = path.extname(file.originalname);
        if ( ext  !== '.jpg' && ext !== '.jpeg' && ext !== '.png'){
            const err = new Eror(' Problems with extension');
            err.code = "EXTENSION";
                return cb(err);
        }
        cb(null, true)
    }
}).single('file')


//

router.post('/image', (req,res) => {
    upload(req, res, err => {
        let error = '';

        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                error = "Image no more than 2mb!"
            }

            if (err.code === 'EXTENSION') {
                error = "Just jpg and png"
            }
        }

        res.json({
            ok: !error,

        })

    });


})




module.exports = router








