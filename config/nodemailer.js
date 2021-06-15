const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// this defines how communication will take place
let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587, // SMTP over SSL/TLS works over this port , while default port number of SMTP is 25
    secure:false, // we don't require 2 step auth, so set to false
    auth:{
        user:'devcodeial@gmail.com',
        pass:'srvkmr@130'
    }
});

let renderTemplate = (data , relativePath) =>{
    let mailHTML ;
    ejs.renderFile(
    path.join(__dirname,'../views/mailers',relativePath),
    data,
    function(err,template){
        if(err) {console.log('Error in rendering Template'); return;}

        mainHTML = template;
        }
    )
    return mainHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate :renderTemplate
}