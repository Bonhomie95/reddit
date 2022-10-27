const express = require('express');
const {isAuth} = require('../utils');
const { createSubReddit, createPost, editSubReddit, createComment } = require( '../controller/subRedditController.js');
const router = express.Router();

router.post('/',isAuth, createSubReddit);
router.put('/:subid',isAuth, editSubReddit);
router.post('/:subid/post', isAuth, createPost);
router.post('/:subid/post/:postid/comment', isAuth, createComment);

module.exports = router;
