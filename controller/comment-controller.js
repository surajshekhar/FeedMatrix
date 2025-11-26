import CommentService from "../services/comment-service.js";
const commentService = new CommentService();

export const createComment = async (req, res) => {
  try {
    const { modelId, modelType } = req.query;
    const { content } = req.body;

    if (!modelId || !modelType || !content) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: modelId, modelType, or content",
        data: {},
        err: {},
      });
    }

    const response = await commentService.create(
      modelId,
      modelType,
      req.user.id, // ✅ logged-in user ID
      content
    );

    return res.status(201).json({
      success: true,
      message: "Successfully added comment",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in comment controller",
      data: {},
      err: error,
    });
  }
};
export const getComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const response = await commentService.getWithUserAndReplies(commentId);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
        data: {},
        err: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment fetched successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in getComment controller",
      data: {},
      err: error,
    });
  }
};
