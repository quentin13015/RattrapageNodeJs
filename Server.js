const express = require("express");
const multer = require('multer');
const app = express();
const fs = require('fs');
const path = require('path');
const mongoose = require ("mongoose");

mongoose.connect('mongodb://localhost/', function(err) {
if (err) { throw err; }
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        fs.mkdir('./uploads', function (err) {
            if (err) {
                console.log(err.stack)
            } else {
                callback(null, './uploads');
            }
        })
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.post('/api/file', function (req, res) {
    var upload = multer({storage: storage,    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    } }).single('userFile');
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(8080, function () {
    console.log("Working on port 8080");
});