const  mongoose = require( 'mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema(
  {
    postid: { type: String, default: mongoose.Types.ObjectId },
    username: { type: String, required: true },
    title: { type: String, required: true },
    body: {type: String,},
    User: {
      id: String,
      name: String,
      email: String,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        body: String,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
