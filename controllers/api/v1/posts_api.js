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
    try {
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id)
        {
            post.remove();
            await Comment.deleteMany({post:req.params.id});
        
            return res.json(200,{
                message:"Post and associated comments deleted !!"
            }); 
        }
        else{
            return res.json(401,{
             message:'You can\'t delete this post'
            });
        }
    } catch (error) {
        console.log('************',error);
        return res.json(508,{
            message: 'Internal Server Error'
        });
    }
    
}