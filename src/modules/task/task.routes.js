import { Router } from "express";

import { protect } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createTaskSchema } from "./task.validation.js";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getTasksHandler,
  toggleTaskStatusHandler,
  updateTaskHandler,
} from "./task.controller.js";

const router = Router();

router.post("/", protect, validate(createTaskSchema), createTaskHandler);
router.get("/", protect, getTasksHandler);
router.get("/:id", protect, getTaskByIdHandler);

router.patch("/:id", protect, updateTaskHandler);

router.delete("/:id", protect, deleteTaskHandler);

router.patch("/:id/status", protect, toggleTaskStatusHandler);
export default router;
