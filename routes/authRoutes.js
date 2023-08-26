import express from "express"
import { registerController } from "../controller/authController.js"

const router = express.Router()

//routes
router.post('/register', registerController)

export default router