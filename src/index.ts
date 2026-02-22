import express from "express";
import dotenv from "dotenv";
import { tasksRouter } from "./routes/tasks.routes";

dotenv.config()
const app = express()

app.use(express.json())

app.use("/tasks", tasksRouter)

app.get("/", (req, res) => {
    res.send("Servidor rodando!")
})


app.listen(3000, (err) => {
    console.log("Servidor rodandooo!")
})