const User = require('../models/user');
const Post = require('../models/post');

module.exports.profile = function(req,res)
{
    //populate the user of each post  //{user:req.user._id}
    Post.find({})
    .populate('user')
    .populate({path:'comments' , populate:{path:'user'}})  // nested populate
    .exec(function(err,posts){
        console.log(posts);
        if(err) return console.log(err);
        return res.render('user_profile',{
            posts:posts
        });
    });
}
module.exports.home = function(req,res)
{
    return res.end('<h1> Users </h1>');
};

module.exports.signUp = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    else return res.render('user_sign_up');
};

module.exports.signIn = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in');
};

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password)
    {
        console.log('Password doesn\'t match');
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err) { console.log('Error in finding user while sign up'); return;}
        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                if(err){ console.log('error in creating user'); return;}

                return res.redirect('/users/sign-in');
            });
        }
        else
        res.redirect('back');
    });
}

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/users/profile');
}

//sign out 
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/')
}