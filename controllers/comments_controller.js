const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker= require('../workers/comment_email_worker');
const queue = require('../config/kue');

module.exports.create = async function(req,res){

    try {
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
                
            post.comments.push(comment); 
            post.save();

            comment = await comment.populate('user','name email').execPopulate();
            // commentsMailer.newComment(comment); // It will directly send the email as soon as the execution hits this line.

            // instead of directly sending emails (from the controller , in real time), we ask worker to send emails for us based on priority(i.e in different time interval / delayed jobs)
            let job = queue.create('emails',comment).save(function(err){    // queue.create() helps us to create a new job inside the queue , if queue doesn't exist it will create the queue for us
                if(err) { console.log('Error',err); return;}
                console.log('Job Enqueued with Id:',job.id);
            });

            if(req.xhr)
            {
                return res.status(200).json({
                    data:{
                        comment : comment
                    },
                    message:'Comment Created'
                });
            }
        }
    } catch (error) {
        console.log('Error',error);
        return;
    }
}

module.exports.destroy = async function(req,res){
    try {
    let comment = await Comment.findById(req.params.id);
    if(comment.user == req.user.id){
        let postId = comment.post;
        comment.remove();
        await Post.findByIdAndUpdate(postId , {$pull:{comments:req.params.id}});
        
        if(req.xhr)
        {
            return res.status(200).json({
                data:{
                    comment_id : req.params.id
                },
                message:'Comment Deleted'
            });
        }
        
        // Way 2

            // Post.findById(comment.post,function(err,post){
            //     console.log('Post linked',post);
            //     post.comments.remove(comment);
            // });
            // comment.remove();
            // return res.redirect('back');
    }
    } catch (error) {
        console.log('Error',error);
        return;
    }
}