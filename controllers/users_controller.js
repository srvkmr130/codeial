module.exports.profile = function(req,res)
{
    return res.render('user_profile');
};
module.exports.home = function(req,res)
{
    return res.end('<h1> Users </h1>');
};