import Task from "../../models/Task.js";
import { ApiError } from "../../utils/ApiError.js";
export const createTask = async (payload, userId) => {
  const task = await Task.create({
    ...payload,
    userId,
  });

  return task;
};

export const getTasks = async (userId, queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    sortBy = "createdAt",
    order = "desc",
  } = queryParams;

  const query = {
    userId,
  };

  if (status) {
    query.status = status;
  }

  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [tasks, total] = await Promise.all([
    Task.find(query)
      .sort({
        [sortBy]: order === "asc" ? 1 : -1,
      })
      .skip(skip)
      .limit(Number(limit)),

    Task.countDocuments(query),
  ]);

  return {
    tasks,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
    stats: {
      totalTasks: await Task.countDocuments({ userId }),
      pendingTasks: await Task.countDocuments({
        userId,
        status: "pending",
      }),
      completedTasks: await Task.countDocuments({
        userId,
        status: "completed",
      }),
    },
  };
};

export const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({
    _id: taskId,
    userId,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};

export const updateTask = async (taskId, userId, payload) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
      userId,
    },
    payload,
    {
      new: true,
    }
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};

export const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    userId,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return null;
};

export const toggleTaskStatus = async (taskId, userId) => {
  const task = await Task.findOne({
    _id: taskId,
    userId,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  task.status = task.status === "pending" ? "completed" : "pending";

  await task.save();

  return task;
};
