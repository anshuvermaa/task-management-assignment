// 📄 backend/src/validators/board.validators.ts

import { z } from "zod"

export const boardSchema = z.object({
  title: z.string().min(1)
})
