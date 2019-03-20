const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema(

    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        login: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,

        }


    }, {
        timestamps: true
    });

schema.set('toJSON',  {
    virtuals: true
});


module.exports = mongoose.model('Comment', schema);

