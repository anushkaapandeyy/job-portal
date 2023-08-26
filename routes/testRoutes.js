import express from 'express';
import { testPostController } from '../controller/testController.js';

//rrouter obj
const router = express.Router();

//routes
router.post('/test-post', testPostController)
//export
export default router