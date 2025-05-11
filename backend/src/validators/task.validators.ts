// 📄 backend/src/validators/task.validators.ts

import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().min(1),
  status: z.string().min(1),
  boardId: z.string()
})

export const reorderSchema = z.array(
  z.object({
    id: z.string(),
    status: z.string()
  })
)
