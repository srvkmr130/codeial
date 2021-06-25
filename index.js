const express = require('express');
const port = 8000;
const env = require('./config/environment');
const logger = require('morgan');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passporJWT = require('./config/passport-jwt-strategy');
const passporGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

//require connect -flas to popup notifications
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

const path = require('path');

if(env.name == "development")
{
    app.use(sassMiddleware({
        src: path.join(__dirname ,env.asset_path,'scss'),
        dest:path.join(__dirname ,env.asset_path,'css'),
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }));
}

// require cookie
const cookieParser = require('cookie-parser');

const { urlencoded } = require('express');
const { pass } = require('./config/mongoose');

app.use(urlencoded());
app.use(cookieParser());
app.use(express.static(env.asset_path));
// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);


//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('layout home', false);


//setup view engine and view path
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the DB
app.use(session({
    name:'codeial',
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store:MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/codeial_development',
            autoRemove:'disabled'
        },function(err)
        {
            console.log(err || 'connect-mongo failed');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router 
app.use('/',require('./routes'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log('error in running the server');
        return;
    }
    console.log('Server is running on port :',port);
});