const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { newComment } = require('../mailers/comments_mailer');

module.exports.toggleLike = async function(req,res){
    try {
        //   route : ..likes/toggle/?id=1234&type=Post
        let likeable;
        let post;
        let comment;
        let deleted = false;
        
        if(req.query.type == 'Post'){
            post = await Post.findById(req.query.id);
            likeable = post.populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        // check if a like already exists 
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        });

        // if exists , then delete it 
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
            post.postLiked = false;
            post.save();
        }else
        {
            // make a new one

            let newLike = await Like.create({
                user:req.user._id,
                likeable: req.query.id, // likeable in like schema is basically storing the id of the object
                onModel:req.query.type // onModel in the like schems is basically storing the type of the object
            });

            likeable.likes.push(newLike._id);
            likeable.save();
            post.postLiked = true;
            post.save();
        }
        if(req.xhr){
            return res.json(200,{
                message:'like toggled',
                data:{
                    deleted:deleted
                }
            });
        }
        
    } catch (error) {
        if(req.xhr){
            return res.json(400,{
                message:'Error in Toggle'
            });
        }
    }
}