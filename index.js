const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


app.use(expressLayouts);
app.use(express.static('./assets'));

//setup view engine and view path
app.set('view engine','ejs');
app.set('views','./views');




//extract styles and scripts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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