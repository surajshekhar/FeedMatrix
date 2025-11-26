import CrudRepository from "./crud-repository.js";
import Comment from "../models/comment.js";
class CommentRepository extends CrudRepository {
  constructor() {
    super(Comment);
  }
  async getWithUserAndReplies(commentId) {
    try {
      const comment = await Comment.findById(commentId)
        .populate({ path: "userId", select: "name email" })
        .populate({
          path: "comments",
          populate: { path: "userId", select: "name email" },
        })
        .lean();

      return comment;
    } catch (error) {
      console.log("Error in CommentRepository.getWithUserAndReplies:", error);
      throw error;
    }
  }
  async find(id) {
    try {
      const tweet = Comment.findById(id).populate({ path: "likes" });

      return tweet;
    } catch (error) {
      console.log(error);
    }
  }
}
export default CommentRepository;
