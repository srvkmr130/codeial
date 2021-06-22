const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:
    {
        type: String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postLiked :{
        type: Boolean,
        default: false
    },
    // include the array of all ids of comments in this post schema
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    // include array of all likes associated with this post
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},
{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;