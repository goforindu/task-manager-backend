import { Router } from "express";

import { profile, register, login } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { registerSchema } from "./auth.validation.js";
import { loginSchema } from "./auth.validation.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/profile", protect, profile);
export default router;
