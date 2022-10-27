const subReddit = require('../models/subRedditModel');
const Post = require('../models/postModel');
const Comments = require('../models/commentsModel');
const User = require('../models/userModel');


//create subreddit
module.exports.createSubReddit = async (req, res, next) => {
  const id = req.user._id;

  try {
    // check if user exist
    const foundUser = await User.findOne({ where: { id } });
    if (foundUser) {
      const userData = {
        email: foundUser.email,
        name: foundUser.name,
      };

      const subRedditData = {
        name: req.body.name,
        community: req.body.community,
        adult: req.body.adult,
        User: userData,
      };

      const SubReddit = new subReddit(subRedditData);
      await SubReddit.save();
      res.send(`Subreddit created successfully \n ${SubReddit}`);
    } else {
      throw new NotFoundError('User does not exist!');
    }
  } catch (error) {
    next(error);
  }
};

// edit subreddit
module.exports.editSubReddit = async (req, res, next) => {
  const id = req.user._id;
  const { subid } = req.params;
  try {
    // check if user exist to obtain user data from user service
    const foundUser = await User.findOne({ where: { id } });
    if (foundUser) {
      const subRedditData = {
        name: req.body.name,
        community: req.body.community,
        adult: req.body.adult,
      };

      const SubReddit = await subReddit.findByIdAndUpdate(subid, subRedditData);
      await SubReddit.save();
      res.send(`Subreddit updated successfully \n ${SubReddit}`);
    } else {
      throw new NotFoundError('User does not exist!');
    }
  } catch (error) {
    next(error);
  }
};

//create post
module.exports.createPost = async (req, res, next) => {
  const id = req.user._id;
  const postId = req.params.subid;

  try {
    // check if user exist
    const foundUser = await User.findOne({ where: { id } });

    // check if subreddit exist
    const foundSubreddit = await subReddit.findOne({ subid: postId });
    if (foundUser) {
      const userData = {
        id,
        email: foundUser.email,
        name: foundUser.name,
      };

      if (foundSubreddit) {
        const postData = {
          username: foundUser.name,
          title: req.body.title,
          body: req.body.title,
          User: userData,
        };

        const post = new Post(postData);
        await post.save();
        res.send(`Post created successfully \n ${post}`);
        return post;
      } else {
        res.send('Subreddit not found');
      }
    } else {
      res.send('User does not exist');
    }
  } catch (error) {
    next(error);
  }
};

//create comment
module.exports.createComment = async (req, res, next) => {
  const id = req.user._id;
  const { subid, postid } = req.params;

  try {
    // check if user exist
    const foundUser = await User.findOne({ where: { id } });

    // check if subreddit exist
    const foundSubreddit = await subReddit.findOne({ subid });
    const foundPost = await Post.findOne({ postid });
    if (foundUser) {
      const userData = {
        email: foundUser.email,
        name: foundUser.name,
      };

      if (foundSubreddit) {

        if (foundPost) {
          const postData = {
            postid,
            username: foundPost.username,
            title: foundPost.title,
            body: foundPost.body,
          };
          const commentData = {
            username: foundSubreddit.username,
            body: req.body.text,
            user: userData,
            post: postData
          };
          const comment = new Comments(commentData);
          await comment.save();
          // foundPost.comments.push(comment)
          res.send(`Comment created successfully \n ${comment}`);
        } else {
          res.send('Post does not exist');
        }
      } else {
        res.send('Subreddit not found');
      }
    } else {
      res.send('User does not exist');
    }
  } catch (error) {
    next(error);
  }
};
