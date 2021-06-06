const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try {
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        if(req.xhr){
            req.flash('success','Post Published !!');
            return res.status(200).json({
                response:
                {
                    post : post
                },
                message:"Post created !!"
            });
        }
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id , function(err,post){
        // .id means converting the object id into string . Note ( user._id is of type ObjectId and
        // using user.id means it gets the string of user._id)
        if(post.user == req.user.id){
            post.remove();
             
            // delete the comments associated with this post
            Comment.deleteMany({post:req.user.id},function(err){
                return res.redirect('back');
            });
        }
        else
        {
            return res.redirect('back');
        }
    });
}