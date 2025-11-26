import express from "express";
import { createTweet, getTweet } from "../../controller/tweet-controller.js";
import { toggleLike } from "../../controller/like-controller.js";
import { createComment,getComment } from "../../controller/comment-controller.js";
import { signup, login } from "../../controller/auth-controller.js";
import { getUserWithTweets } from "../../controller/userTweetInfo-controller.js";
import {authenticate} from '../../middlewares/authenticate.js'
const router = express.Router();

router.get('/user/:id/details',authenticate, getUserWithTweets);

// likes routes
router.post("/likes/toggle", authenticate, toggleLike); 

// comment routes
router.post("/comments", authenticate, createComment);
router.get("/comments/:id",authenticate,getComment);
// tweet routes
router.post("/tweets", authenticate, createTweet); 
router.get("/tweets/:id", getTweet);    

//  Auth routes
router.post("/signup", signup);
router.post("/login", login);


export default router;
