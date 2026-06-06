import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import taskRoutes from "./modules/task/task.routes.js";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use(notFound);

app.use(errorMiddleware);
app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

export default app;
