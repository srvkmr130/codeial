const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    console.log('here');
    Post.create({
        content:req.body.content,
        user:req.user._id
    }, function(err,post){
        if(err){console.log('error in creating a post');return;}
        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id , function(err,post){
        // .id means converting the object id into string
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