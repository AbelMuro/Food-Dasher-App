const express = require('express');
const formidable = require('formidable');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
    })
    console.log(req.body);
    res.send("response");
})

app.listen(5000);
