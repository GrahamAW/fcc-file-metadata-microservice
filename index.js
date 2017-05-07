'use strict';

const express = require('express');
const chalk = require('chalk');
require('dotenv').config();
const multer = require('multer');
const upload = multer({
  dest: 'uploads/'
});

const app = express();
app.use(express.static('public'));

const port = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: __dirname + '/public/'
  });
});

app.post('/', upload.single('file'), function (req, res) {
  if (req.file) {
    var obj = {
      'size': req.file.size
    };
    res.send(obj).end();
  } else {
    res.end('No File Uploaded');
  }
});

app.listen(port, () => {
  console.log(chalk.yellow(`Listening on port ${port}`));
});
