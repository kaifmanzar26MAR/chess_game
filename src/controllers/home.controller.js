import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const home = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(200, "welcome"));
});
export { home };