// 📄 backend/src/routes/task.routes.ts

import { Router } from "express"
import {
  createTask,
  getTasksByBoard,
  updateTask,
  deleteTask,
  reorderTasks
} from "../controllers/task.controller"
import { authenticate } from "../middlewares/auth.middleware"

const router = Router()

// All routes require authentication
router.use(authenticate as any)

router.post("/", createTask)
router.get("/board/:boardId", getTasksByBoard)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)
router.post("/reorder", reorderTasks) // drag & drop reorder

export default router
