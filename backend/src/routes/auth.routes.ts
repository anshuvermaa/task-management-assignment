// 📄 backend/src/routes/auth.routes.ts

import { Router } from "express"
import { register, login, getMe } from "../controllers/auth.controller"
import { authenticate } from "../middlewares/auth.middleware"

const router = Router()

// Public
router.post("/register", register)
router.post("/login", login)

// Private
router.get("/me", authenticate as any, getMe)

export default router
