import express from 'express';
import { testPostController } from '../controller/testController.js';
import userAuth from '../middleware/authMiddleware.js';

//rrouter obj
const router = express.Router();

//routes
router.post('/test-post', userAuth, testPostController)
//export
export default router;