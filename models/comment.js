const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belongs to a user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // comment is made on a post
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    // include array of all likes associated with this comment
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps:true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;