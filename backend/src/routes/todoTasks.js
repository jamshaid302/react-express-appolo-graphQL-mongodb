import express from "express";
const router = express.Router();
import {
  getTasks,
  createUpdateTask,
  deleteTask,
} from "../controllers/todoTasks/index.js";

router.get("/", getTasks);
router.post("/task", createUpdateTask);
router.delete("/task", deleteTask);

export default router;
