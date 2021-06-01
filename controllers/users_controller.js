const User = require('../models/user');
const Post = require('../models/post');

module.exports.profile = function(req,res)
{
    User.findById(req.params.id,function(err,user){
        if(err) {return console.log('Error',err);}
        return res.render('user_profile',{
            profile_user:user
        });
    })
}

module.exports.update = function(req,res)
{
    console.log('Here')
    if(req.user.id == req.params.id)
    {
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }
    else
    {
        return res.status(401).send('Unauthorized');
    }
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
        if(err) {console.log('Error in finding user while sign up'); return;}
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
    return res.redirect('/users/home');
}

//sign out 
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/')
}