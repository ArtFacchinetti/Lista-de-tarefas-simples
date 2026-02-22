import express from "express";

import { getTasks, createTask, updateTask } from "../controllers/tasks.controller"

const router = express.Router()

router.post("/", createTask);
router.get("/", getTasks);
router.put("/edit/:id", updateTask)

export const tasksRouter = router;