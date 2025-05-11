// 📄 backend/src/controllers/board.controller.ts

import { Request, Response } from "express"
import { prisma } from "../config/prisma"
import { boardSchema } from "../validators/board.validators"
import { AuthRequest } from "../middlewares/auth.middleware"

export const createBoard = async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const data = boardSchema.parse(req.body)

    const board = await prisma.board.create({
      data: {
        title: data.title,
        userId: req.userId!
      }
    })

    return res.status(201).json(board)
  } catch (err: any) {
    return res.status(400).json({ message: err.message })
  }
}

export const getBoards = async (req: AuthRequest, res: Response):Promise<any> => {
  const boards = await prisma.board.findMany({
    where: { userId: req.userId! },
    include: { tasks: true }
  })

  return res.json(boards)
}

export const getBoardById = async (req: AuthRequest, res: Response):Promise<any> => {
  const board = await prisma.board.findFirst({
    where: {
      id: req.params.id,
      userId: req.userId!
    },
    include: { tasks: true }
  })

  if (!board) return res.status(404).json({ message: "Board not found" })

  return res.json(board)
}

export const updateBoard = async (req: AuthRequest, res: Response):Promise<any> => {
  try {
    const data = boardSchema.parse(req.body)

    const board = await prisma.board.updateMany({
      where: {
        id: req.params.id,
        userId: req.userId!
      },
      data: {
        title: data.title
      }
    })

    if (board.count === 0) return res.status(404).json({ message: "Board not found or unauthorized" })

    return res.json({ message: "Board updated" })
  } catch (err: any) {
    return res.status(400).json({ message: err.message })
  }
}

export const deleteBoard = async (req: AuthRequest, res: Response):Promise<any> => {
  await prisma.board.deleteMany({
    where: {
      id: req.params.id,
      userId: req.userId!
    }
  })

  return res.json({ message: "Board deleted" })
}
