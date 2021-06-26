const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'helloWorld',
    db : 'codeial_development',
    smtp : {
        service:'gmail',
        host:'smtp.gmail.com',
        port:587, // SMTP over SSL/TLS works over this port , while default port number of SMTP is 25
        secure:false, // we don't require 2 step auth, so set to false
        auth:{
            user:'devcodeial@gmail.com',
            pass:'srvkmr@130'
        }
    },
    google_clientID : '334678263913-7lvt84eu344942v92qan36p8rr2al29h.apps.googleusercontent.com',
    google_clientSecret: '8o4Z-Np7FbKtOCaoeUWlZ9TA',
    google_callbackURL:'http://localhost:8000/users/auth/google/callback',
    jwt_secret : 'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}


// export CODEIAL_ENVIRONMENT="production"
// export CODEIAL_ASSET_PATH="/assets"
// export CODEIAL_SESSION_COOKIE_KEY="kwOHHU6n0Lq8kPRUD2prltam5k2k2Qi6"
// export CODEIAL_DB="codeial_production"
// export CODEIAL_SMTP_AUTH_USER="devcodeial@gmail.com"
// export CODEIAL_SMTP_AUTH_PASS="srvkmr@130"
// export CODEIAL_SMTP_SERVICE="gmail"
// export CODEIAL_SMTP_HOST="smtp.gmail.com"
// export CODEIAL_GOOGLE_CLIENT_ID="334678263913-7lvt84eu344942v92qan36p8rr2al29h.apps.googleusercontent.com"
// export CODEIAL_GOOGLE_CLIENT_SECRET="8o4Z-Np7FbKtOCaoeUWlZ9TA"
// export CODEIAL_GOOGLE_CALLBACK_URL="http://codeial.com/users/auth/google/callback"
// export CODEIAL_JWT_SECRET="HS9f20a7BA1q6eMjtsRsjfSCxzPeNJlF"

const production = {
    name : process.env.CODEIAL_ENVIRONMENT,
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,
    db : process.env.CODEIAL_DB,
    smtp : {
        service:process.env.CODEIAL_SMTP_SERVICE,
        host:process.env.CODEIAL_SMTP_HOST,
        port:587, // SMTP over SSL/TLS works over this port , while default port number of SMTP is 25
        secure:false, // we don't require 2 step auth, so set to false
        auth:{
            user:process.env.CODEIAL_SMTP_AUTH_USER,
            pass:process.env.CODEIAL_SMTP_AUTH_PASS
        }
    },
    google_clientID : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET
}

module.exports = development ;
//eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);