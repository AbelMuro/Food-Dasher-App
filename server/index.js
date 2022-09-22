const express = require('express');
const formidable = require('formidable');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use('/example', (req, res) => {
    console.log(req.body);
    res.send("greetings");
})

app.use('/login', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        res.send("You Entered " + fields.userName);
        res.send(" and " + fields.password);
    })
})



app.listen(5000);
