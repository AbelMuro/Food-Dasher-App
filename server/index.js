const express = require('express');
const formidable = require('formidable');
const app = express();
const bodyParser = require("body-parser");     //this is used to parse the 'body' of a fetch request 
const cookieParser = require("cookie-parser"); //this is used to parse incoming cookies with every request

app.use(bodyParser.json());
app.use(cookieParser());



app.use('/example', (req, res) => {
    console.log(req.body);
    res.send("greetings");
})

app.use('/login', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        res.send("You Entered " + fields.username + " and " + fields.password);
    })
})

app.use('/setCookie', (req, res) => {
    console.log(req.cookies);
    res.send({"data": "just some data"});
})



app.listen(5000, () => console.log("Server is running on port 5000"));
