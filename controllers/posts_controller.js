const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try {
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                response:
                {
                    post : post
                },
                message:"Post created !!"
            });
        }

        // req.flash('success','Post Published !!');
        // return res.redirect('back');

    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string . Note ( user._id is of type ObjectId and
        // using user.id means it gets the string of user._id)
        if(post.user == req.user.id){
            post.remove();
             
            // delete the comments associated with this post
            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:
                    {
                        post_id : req.params.id
                    },
                    message:"Post deleted !!"
                });
            }
            // req.flash('success','Post Deleted !!');
            // return res.redirect('back');
        }
        
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
    
}