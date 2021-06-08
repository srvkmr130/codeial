const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = async function(req,res)
{
    //{user:req.user._id}
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user') //populate the user of each post 
        .populate({path:'comments' , populate:{path:'user'}}) ; // nested populate
        
        let post = posts[0];
        console.log(post.createdAt.toString().split(" "));
        
        let users = await User.find({});

        return res.render('home',{
            posts:posts,
            all_users:users
        });
        
    }catch (error) {
        console.log('Error',err);
        return;
    }
}

module.exports.index = function(req,res)
{
    console.log(req.isAuthenticated());
    if(req.isAuthenticated())
    {
        return res.redirect('/users/home');
    }
    return res.render('index',{layout : 'index'});
};