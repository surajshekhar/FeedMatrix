import TweetService from "../services/tweet-service.js";
import upload from "../config/file-upload-s3-config.js";
import { uploadMultipleFilesToS3 } from "../utils/s3-uploader.js";

const singleUploader = upload.array("image", 10); // max 10 images
const tweetService = new TweetService();

export const createTweet = async (req, res) => {
  try {
    singleUploader(req, res, async function (err) {
      if (err) return res.status(500).json({ error: err });

      const imageUrls = await uploadMultipleFilesToS3(req.files);
      const payload = {
        ...req.body,
        image: imageUrls,
        user: req.user.id, // ✅ associate tweet with logged-in user
      };

      const response = await tweetService.create(payload);

      return res.status(201).json({
        success: true,
        message: "Successfully created a new tweet",
        data: response,
        err: {},
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in tweet controller",
      data: {},
      err: error,
    });
  }
};

export const getTweet = async (req, res) => {
  try {
    const response = await tweetService.get(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the tweet",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in tweet controller",
      data: {},
      err: error,
    });
  }
};
