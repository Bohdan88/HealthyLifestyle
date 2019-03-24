const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post =  require('./post')


const schema = new Schema(

    {
        body: {
            type: String,
            required: true
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            autopopulate: true

        },

        post: {
            type: Schema.Types.ObjectId,
            ref: "Post"
        },

        children: [{
            type: Schema.Types.ObjectId,
            ref: "Comment",
            autopopulate: true

        }],

        createdAt: {
            type: Date,
            default: Date.now
        },
        // для оптимизации
        post: {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        },


    }, {
        timestamps: false
    });


//schema.pre('save',  async function(next) {
//
//    this.url = tr.slugify(this.title)
//    next();
//});
//
schema.plugin(require('mongoose-autopopulate'));



schema.set('toJSON',  {
    virtuals: true
});



module.exports = mongoose.model('Comment', schema);


