import jobsModel from "../models/jobsModel.js";
//CREATE JOBS
export const createJobController = async (req, res, next) => {
    const { company, position } = req.body
    if (!company || !position) {
        next("provide all fields")
    }
    req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body)
    res.status(201).json({ job });

};
//GET JOBS
export const getAllJobsController = async (req, res, next) => {
    const jobs = await jobsModel.find({ createdBy: req.user.userId })
    res.status(200).json({
        totalJobs: jobs.length,
        jobs,
    });
};

//UPDATE JOBS
export const updateJobController = async (req, res, next) => {
    const { id } = req.params
    const { company, position } = req.body
    //validation
    if (!company || !position) {
        next("please provide all fields")
    }
    //find job
    const job = await jobsModel.findOne({ _id: id })
    //validation
    if (!job) {
        next(`no jobs found with this id ${id}`)
    }
    if (req.user.userId !== job.createdBy.toString()) {
        next('You are not authorized to update this job')
        return;
    }
    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
    });
    //res
    res.status(200).json({
        updateJob
    });
};
//delete function 
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params
    //findJob
    const job = await jobsModel.findOne({ _id: id })
    //validation
    if (!job) {
        next(`no job found with id ${id}`)
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next("you are not authorized to deleted this job")
        return;
    }
    await job.deleteOne();
    res.status(200).json({
        message: "Successfully deleted"
    })

};