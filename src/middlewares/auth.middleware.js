import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Access denied. No token provided.");
  }

  const decoded = jwt.verify(token, env.JWT_SECRET);

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;

  next();
});
