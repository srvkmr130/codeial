const User = require('../../../models/user');

const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){

    try {
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:'Invalid Username or Password'
            });
        }

        return res.json(200,{
            message:'Sign in successful : Your token is here , keep it safe',
            data : {
                token : jwt.sign(user.toJSON(),'codeial',{expiresIn : '1000000'})
            }
        })
        
    } catch (error) {

        console.log('************',error);
        return res.json(508,{
            message: 'Internal Server Error'
        });
    }
}