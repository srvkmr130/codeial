const User = require('../models/user');

module.exports.profile = function(req,res)
{
    return res.render('user_profile');
};
module.exports.home = function(req,res)
{
    return res.end('<h1> Users </h1>');
};

module.exports.signUp = function(req,res)
{
    return res.render('user_sign_up');
};
module.exports.signIn = function(req,res)
{
    return res.render('user_sign_in');
};

module.exports.create = function(req,res){
if(req.body.password != req.body.confirm_password)
    {
        console.log('Password doesn\'t match');
        res.redirect('back');
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