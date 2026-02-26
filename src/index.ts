import express from "express";
import dotenv from "dotenv";
import { tasksRouter } from "./routes/tasks.routes";
import path from "path"

dotenv.config()
const app = express()

app.use(express.static(path.join(__dirname, "views")))

app.use(express.urlencoded({ extended: true }));

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.use("/tasks", tasksRouter)


app.listen(3000, (err) => {
    console.log("Servidor rodandooo!")
})