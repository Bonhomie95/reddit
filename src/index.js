const express = require('express');
const path = require('path');
const { ChangeEvent } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes.js');
const User = require('./models/userModel');
const subRedditRouter = require('./routes/subRedditRoutes.js');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/subreddit', subRedditRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});


User.watch().on('change', (data) => {
  console.log(data.fullDocument);
});
