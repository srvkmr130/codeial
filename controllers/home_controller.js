module.exports.home = function(req,res)
{
    console.log(req.cookies);
    res.cookie('userId',40);
    return res.render('home');
};