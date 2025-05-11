// 📄 backend/src/controllers/auth.controller.ts

import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../config/prisma"
import { registerSchema, loginSchema } from "../validators/auth.validators"
import { AuthRequest } from "../middlewares/auth.middleware"

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = registerSchema.parse(req.body)

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword
      }
    })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    })

    return res.status(201).json({ token })
  } catch (err: any) {
    return res.status(400).json({ message: err.message })
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    })

    return res.json({ token })
  } catch (err: any) {
    return res.status(400).json({ message: err.message })
  }
}

export const getMe = async (req: AuthRequest, res: Response): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId }
  })
  if (!user) return res.status(404).json({ message: "User not found" })

  return res.json({ id: user.id, email: user.email })
}
