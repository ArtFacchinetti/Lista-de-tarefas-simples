import express from "express";
import dotenv from "dotenv";
import { tasksRouter } from "./routes/tasks.routes";

dotenv.config()
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Servidor rodando!")
})

app.use("/tasks", tasksRouter)

app.listen(3000, (err) => {
    console.log("Servidor rodandooo!")
})