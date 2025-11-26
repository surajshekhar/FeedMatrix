import LikeService from "../services/like-service.js";
const likeService = new LikeService();

export const toggleLike = async (req, res) => {
  try {
    const { modelId, modelType } = req.query;

    if (!modelId || !modelType) {
      return res.status(400).json({
        success: false,
        message: "Missing modelId or modelType in query",
        data: {},
        err: {},
      });
    }

    const response = await likeService.toggleLike(
      modelId,
      modelType,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      data: response,
      err: {},
      message: "Successfully toggled like",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Something went wrong in like controller",
      err: error,
    });
  }
};
