import { PrismaClient } from "../generated/prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Erro no servidor!")
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const task = await prisma.task.create({
            data: {
                title,
                description
            }
        });
        return res.status(201).json(task)
    } catch (err) {
        console.log(err)
        return res.status(500).send("Erro genérico")
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {title, description, done} = req.body;

        const task = await prisma.task.update({
            where: {id: Number(id)},
            data: {title, description, done}
        })

        return res.json(task)

    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const task = await prisma.task.delete({
            where: {id:Number(id)}
        })
        return res.status(204).json(task)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}