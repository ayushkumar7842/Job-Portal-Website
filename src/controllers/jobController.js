import {
  addApplicantToSpecificJobId,
  addJobData,
  deleteJobData,
  getJobFromId,
  getJobs,
  updateJobData,
} from "../models/jobModel.js";
import sendEmail from "../config/mail.js";

export default class JobController {
  // this will render all the jobs
  getAllJobs = (req, res) => {
    const jobs = getJobs();
    res.render("jobs", { jobs: jobs });
  };

  // render the job with the specific id
  getJobWithId = (req, res) => {
    let isRecruiter = false;
    if (req.session.userEmail) {
      isRecruiter = true;
    }
    // collect the id from request.params
    const { id } = req.params;
    const jobId = Number(id);
    //validating the id
    if (Number.isNaN(jobId)) {
      return res.renser("customError", { errorMsg: "Job Id is not valid" });
    }
    // if the id is valid
    const jobData = getJobFromId(jobId);

    if (!jobData) {
      return res.render("customError", {
        errorMsg: `job data is not present with the given id ${jobId}`,
      });
    }

    res.render("jobDetails", { job: jobData, isRecruiter });
  };

  createJob = (req, res) => {
    // adding the job data to the models jobs
    const status = addJobData(req.body);
    if (!status) {
      res.render("customError", { errorMsg: "Job is not posted" });
    } else {
      res.redirect("/jobs");
    }
  };
  // get post job view
  getPostJobView = (req, res) => {
    if (!req.session.userEmail) {
      res.render("error");
    } else {
      res.render("postJob", { isUpdate: false });
    }
  };
  // render the update page
  getUpdateJobView = (req, res) => {
    if (!req.session.userEmail) {
      res.render("error");
      return;
    }
    const { id } = req.params;
    const jobId = Number(id);
    const jobData = getJobFromId(jobId);
    if (jobData) {
      res.render("postJob", { job: jobData, isUpdate: true });
    } else {
      res.render("customError", { errorMsg: "Job not found" });
    }
  };

  // job data must be updated after submiting through form
  postUpdateJob = (req, res) => {
    const { id } = req.params;
    const jobId = Number(id);
    const isUpdated = updateJobData(jobId, req.body);
    // if the job data is not updated then show error
    if (!isUpdated) {
      res.render("customError", { errorMsg: "job data is not updated" });
    } else {
      res.redirect("/jobs");
    }
  };

  // delete the job data by given id
  deleteJobWithId = (req, res) => {
    const { id } = req.params;
    //convert the id into the number
    const jobId = Number(id);
    // check the id
    if (Number.isNaN(jobId)) {
      return res.render("customError", {
        errorMsg: "job id is not valid",
      });
    }
    // ask the model to delete the job with help of job id
    const isDeleted = deleteJobData(jobId);

    if (!isDeleted) {
      res.status(400).json({
        success: false,
        meesage: "Not deleted",
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  };

  // this will show all the applicants
  getAllApplicants = (req, res) => {
    if (!req.session.userEmail) {
      res.render("error");
      return; // Stop further execution if the user is not authenticated
    }

    const { id } = req.params;
    const jobId = Number(id);
    // get the job with the given id
    const jobData = getJobFromId(jobId);

    if (!jobData) {
      res.render("error"); // Handle the case where the job is not found
      return;
    }

    // applicants
    const applicantsData = jobData.applicants;
    res.render("applicants", { applicants: applicantsData });
  };

  // add applicant to the specific jb id
  addApplicants = async (req, res) => {
    const { id } = req.params;
    const jobId = Number(id);
    const { name, email, contact } = req.body;
    const resumePath = req.file.filename;

    // Create the applicant data object
    const data = { name, email, contact, resumePath };

    // Attempt to add the applicant to the specified job
    const status = addApplicantToSpecificJobId(jobId, data);

    if (!status) {
      // Handle error: Job not found or failed to add applicant
      return res.status(404).send("Failed to add applicant. Job not found.");
    }
    //send the confirmation email
    try {
      const result = await sendEmail(
        email,
        "confirmation",
        "Successfully Applied"
      );
      // console.log(result);
      // Redirect to the jobs page if the operation is successful
      res.redirect("/jobs");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };

  searchJobs = (req, res) => {
    const company = req.query.company;

    if (!company) {
      return res.render("customError", {
        errorMsg: "company name is required",
      });
    }
    // the company name is valid
    const companyName = company.toLowerCase();
    // get the all jobs data
    const jobs = getJobs();
    // Filter the list of jobs by company name
    const filteredJobs = jobs.filter((job) => {
      return job.companyname.toLowerCase() === companyName;
    });

    res.render("jobs", { jobs: filteredJobs });
  };
}
