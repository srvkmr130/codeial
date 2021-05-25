const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));


// require cookie
const cookieParser = require('cookie-parser');

const { urlencoded } = require('express');
const { pass } = require('./config/mongoose');

app.use(urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
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
    secret:'helloWorld',
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