import express from "express";
import todoTasksRouter from "./todoTasks.js";

const router = express.Router();

router.use("/todo", todoTasksRouter);

export default router;
