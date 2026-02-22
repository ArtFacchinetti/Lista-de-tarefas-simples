import express from "express";

import { getTasks } from "../controllers/tasks.controller"

const router = express.Router()

router.get("/", getTasks);

export const tasksRouter = router;