const express = require('express');
const formidable = require('formidable');
const app = express();


app.use('/login', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        res.send("it works");
    })
})

app.listen(5000);
