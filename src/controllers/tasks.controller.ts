import { PrismaClient } from "../generated/prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks)
    }
    catch (err) {
        res.status(500).send("Erro no servidor!")
    }
}

export const createTask = async (req: Request, res: Response) => {

}