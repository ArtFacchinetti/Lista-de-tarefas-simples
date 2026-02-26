import express from "express";

import { getTasks, createTask, updateTask, deleteTask, checkTask, unCheckTask } from "../controllers/tasks.controller"

const router = express.Router()

router.post("/", createTask);
router.get("/", getTasks);
router.put("/check/:id", checkTask);
router.put("/uncheck/:id", unCheckTask);
router.put("/edit/:id", updateTask);
router.delete("/:id", deleteTask);

export const tasksRouter = router;