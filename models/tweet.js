import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: [250, "Tweet can not be more than 250 characters"], //comment will not be more than 250 words.
    },
    //every tweet has some hashtag -build seprate model for it (showw all the post with this hashtags)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    image: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true } //timestamp add two properties created at and updated at
);

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
