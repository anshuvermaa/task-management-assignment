// 📄 backend/src/routes/board.routes.ts

import { Router } from "express"
import {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard
} from "../controllers/board.controller"
import { authenticate } from "../middlewares/auth.middleware"

const router = Router()

// All routes are protected
router.use(authenticate as any)

router.post("/", createBoard)
router.get("/", getBoards)
router.get("/:id", getBoardById)
router.put("/:id", updateBoard)
router.delete("/:id", deleteBoard)

export default router
