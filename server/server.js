const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Models
const { User } = require('./models/user');

//==============================
//            USER
//==============================

app.post('api/users/register', (req, res) => {
  res.status(200);
});

const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
