import User from "../models/user.js";
import Tweet from "../models/tweet.js";
import Comment from "../models/comment.js";
import Like from "../models/like.js";
import Hashtag from "../models/hashtags.js";

export const getUserWithTweets = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const tweets = await Tweet.find({})
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .populate({
        path: "likes",
        populate: {
          path: "user",
          select: "name email",
        },
      });

    const tweetDataWithHashtags = await Promise.all(
      tweets.map(async (tweet) => {
        const hashtags = await Hashtag.find({ tweets: tweet._id }).select(
          "title"
        );
        return {
          ...tweet.toObject(),
          hashtags,
        };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Fetched user and related tweets successfully",
      data: {
        user,
        tweets: tweetDataWithHashtags,
      },
    });
  } catch (err) {
    console.error("[getUserWithTweets] Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching user tweet details",
      error: err.message,
    });
  }
};
