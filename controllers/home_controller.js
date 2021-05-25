module.exports.home = function(req,res)
{
    console.log(req.isAuthenticated());
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('home',{layout : 'home'});
};