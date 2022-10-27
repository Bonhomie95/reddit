const express = require('express');
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const {isAuth} = require('../utils')
const { generateToken } = require('../utils.js');

const userRouter = express.Router();

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  })
);

userRouter.delete(
  '/signout',isAuth,
  expressAsyncHandler(async (req, res) => {
    
    // req.headers.authorization = "";
    const authorization = req.headers.authorization;
    const token = authorization.slice(7, authorization.length)
    res.cookie('token', 'none', {
      httpOnly: true,
    });
    console.log(token)

    res.status(200).send({message: "You have been signed out"})
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

module.exports = userRouter;
