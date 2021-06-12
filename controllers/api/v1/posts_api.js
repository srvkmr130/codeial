const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user','-password -__v') //populate the user of each post excluding password and version number
        .populate({path:'comments' , populate:{path:'user'}}) ; 

    return res.status(200).json({
        response:posts,
        message:"Post created !!"
    });
}

module.exports.delete = async function(req,res){
    let post = await Post.findById(req.params.id);
    console.log(req);
    post.remove();
    // here req.user won't work as user is null
    await Comment.deleteMany({post:req.params.id});

    return res.json(200,{
        message:"Post deleted !!"
    });
}