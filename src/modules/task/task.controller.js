import { catchAsync } from "../../utils/catchAsync.js";
import { createTask } from "./task.service.js";
import { getTasks } from "./task.service.js";
import {
  getTaskById,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "./task.service.js";
export const createTaskHandler = catchAsync(async (req, res) => {
  const task = await createTask(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

export const getTasksHandler = catchAsync(async (req, res) => {
  const result = await getTasks(req.user._id, req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const getTaskByIdHandler = catchAsync(async (req, res) => {
  const task = await getTaskById(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    data: task,
  });
});

export const updateTaskHandler = catchAsync(async (req, res) => {
  const task = await updateTask(req.params.id, req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

export const deleteTaskHandler = catchAsync(async (req, res) => {
  await deleteTask(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});
export const toggleTaskStatusHandler = catchAsync(async (req, res) => {
  const task = await toggleTaskStatus(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: "Task status updated successfully",
    data: task,
  });
});
