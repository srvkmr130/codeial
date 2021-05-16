const User = require('../models/user');

module.exports.profile = function(req,res)
{
    User.findById(req.cookies.user_id, function(err,user)
    {
        if(err)
        {
            console.log('Error in fetching document from DB');
            return res.redirect('/users/sign-up');
        }
        else if(user)
        {
            return res.render('user_profile',{
                title:`Profile | ${user.name}`,
                username: user.name
            });
        }  
        else
        return res.redirect('/users/sign-in');
    });
};
module.exports.home = function(req,res)
{
    return res.end('<h1> Users </h1>');
};

module.exports.logOut = function(req,res)
{
    console.log(req.cookies);
    res.cookie('user_id','');
    return res.redirect('/');
}

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
        return res.redirect('back');
    });
}

module.exports.createSession = function(req,res){
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err) { console.log('Error in finding user while sign in'); return;}
        if(user){
           if(user.password != req.body.password)
            {
                return res.redirect('back');
            }

            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else{
            return res.redirect('back');
        }
    });
}