const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    username: { type: String },
    body: { type: Array },
    user: {name: String, email: String },
    post: { postid: String, username: String, title: String, body: String },
  },
  { timestamps: true }
);

const Comments = mongoose.model('comments', commentSchema);

module.exports = Comments;
