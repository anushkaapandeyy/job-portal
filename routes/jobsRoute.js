import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createJobController, deleteJobController, getAllJobsController, updateJobController } from '../controller/jobsController.js'

const router = express.Router()

//routes
//CREATE JOB || POST
router.post('/create-job', userAuth, createJobController);
//GET JOBS || GET
router.get('/get-job', userAuth, getAllJobsController);
//UPDATE JOBS || PUT || PATCH
router.patch('/update-job/:id', userAuth, updateJobController);
//delete jobs
router.delete('/delete-job/:id', userAuth, deleteJobController);

export default router