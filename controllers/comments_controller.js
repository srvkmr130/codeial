const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
      if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,Comment){
                if(err)
                {
                    return console.log(err);
                }
                post.comments.push(Comment); 
                post.save();
    
                return res.redirect('/');
            });
        }
        else{
            return console.log(err);
        }
    });
}