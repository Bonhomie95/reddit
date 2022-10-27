const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subRedditSchema = new Schema(
  {
    subid: { type: String, default: mongoose.Types.ObjectId },
    name: { type: String, required: true, unique: true },
    community: { type: String, required: true },
    adult: { type: Boolean, default: false, required: true },
    User: {
      id: String,
      name: String,
      email: String,
    },
  },
  {
    timestamps: true,
  }
);

const subReddit = mongoose.model('subReddit', subRedditSchema);
module.exports = subReddit;
