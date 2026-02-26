import express from "express";

import { getTasks, createTask, updateTask, deleteTask } from "../controllers/tasks.controller"

const router = express.Router()

router.post("/", createTask);
router.get("/", getTasks);
router.put("/edit/:id", updateTask)
router.delete("/:id", deleteTask)

export const tasksRouter = router;