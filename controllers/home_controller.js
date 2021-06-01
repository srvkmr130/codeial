const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = function(req,res)
{
    //populate the user of each post  //{user:req.user._id}
    Post.find({})
    .populate('user')
    .populate({path:'comments' , populate:{path:'user'}})  // nested populate
    .exec(function(err,posts){
        User.find({}, function(err,users){
            if(err) return console.log(err);
            return res.render('home',{
                posts:posts,
                all_users:users
            });
        });
    });
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