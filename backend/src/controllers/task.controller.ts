// 📄 backend/src/controllers/task.controller.ts

import { Request, Response } from "express"
import { prisma } from "../config/prisma"
import { taskSchema, reorderSchema } from "../validators/task.validators"
import { AuthRequest } from "../middlewares/auth.middleware"

export const createTask = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const data = taskSchema.parse(req.body)

    const task = await prisma.task.create({
      data: {
        title: data.title,
        status: data.status,
        boardId: data.boardId
      }
    })

    return res.status(201).json(task)
  } catch (err: any) {
    return res.status(400).json({ message: err.message })
  }
}

export const getTasksByBoard = async (req: AuthRequest, res: Response): Promise<any> => {
  const tasks = await prisma.task.findMany({
    where: { boardId: req.params.boardId },
    orderBy: { createdAt: "asc" }
  })

  return res.json(tasks)
}

export const updateTask = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const data = taskSchema.partial().parse(req.body)

    const task = await prisma.task.update({
      where: { id: req.params.id },
      data
    })

    return res.json(task)
  } catch (err: any) {
    return res.status(400).json({ message: err.message })
  }
}

export const deleteTask = async (req: AuthRequest, res: Response): Promise<any> => {
  await prisma.task.delete({
    where: { id: req.params.id }
  })

  return res.json({ message: "Task deleted" })
}

export const reorderTasks = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const data = reorderSchema.parse(req.body)

    const updates = data.map((t) =>
      prisma.task.update({
        where: { id: t.id },
        data: {
          status: t.status
        }
      })
    )

    await prisma.$transaction(updates)
    return res.json({ message: "Tasks reordered" })
  } catch (err: any) {
    return res.status(400).json({ message: err.message })
  }
}
