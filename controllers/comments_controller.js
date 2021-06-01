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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id , function(err,comment){
        console.log('Comment found',comment);
        if(comment.user == req.user.id){

            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId , {$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            });

            // Way 2

            // Post.findById(comment.post,function(err,post){
            //     console.log('Post linked',post);
            //     post.comments.remove(comment);
            // });
            // comment.remove();
            // return res.redirect('back');
        }
        else{
            return console.log(err);
        }
});
}