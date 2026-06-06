import { getProfile, registerUser } from "./auth.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { loginUser } from "./auth.service.js";

export const register = catchAsync(async (req, res) => {
  const result = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const login = catchAsync(async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});
export const profile = catchAsync(async (req, res) => {
  console.log("REQ USER", req.user);
  console.log("REQ USER ID", req.user._id);
  const user = await getProfile(req.user._id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
