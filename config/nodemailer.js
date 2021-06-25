const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

// this defines how communication will take place
let transporter = nodemailer.createTransport(env.smtp);

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