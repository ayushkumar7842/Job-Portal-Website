let jobs = [
  {
    id: 1,
    jobcategory: "Tech",
    jobdesignation: "SDE",
    joblocation: "Gurgaon HR IND Remote",
    companyname: "Coding Ninjas",
    salary: "14 lpa",
    applyby: "2024-10-20",
    skillsrequired: ["Angular", "React", "NodeJs", "SQL", "MognoDB", "AWS"],
    numberofopenings: 5,
    jobposted: "10/11/2024, 6:00:00 PM",
    applicants: [
      {
        applicantId: 1,
        name: "Ayush Kumar",
        email: "ayush@gmail.com",
        contact: "8252898701",
        resumePath: "1729522850667-Ayush_Kumar_CV.pdf",
      },
      {
        applicantId: 2,
        name: "Pavan Kalayan",
        email: "pavan@gmail.com",
        contact: "9874563210",
        resumePath: "1729522979293-Pavan_Kalayan_Resume.pdf",
      },
    ],
  },
  {
    id: 2,
    jobcategory: "Tech",
    jobdesignation: "Backend Developer",
    joblocation: "Hyderabad India",
    companyname: "Microsoft",
    salary: "12 lpa",
    applyby: "2024-10-20",
    skillsrequired: ["Express", "C++", "MongoDB", "Data Structures & Algo"],
    numberofopenings: 5,
    jobposted: "10/11/2024, 10:00:00 PM",
    applicants: [
      {
        applicantId: 1,
        name: "Ayush Kumar",
        email: "ayush@gmail.com",
        contact: "8252898701",
        resumePath: "1729522850667-Ayush_Kumar_CV.pdf",
      },
    ],
  },
  {
    id: 3,
    jobcategory: "Tech",
    jobdesignation: "FrontEnd Developer",
    joblocation: "Banglore India",
    companyname: "Just Pay",
    salary: "8 lpa",
    applyby: "2024-10-20",
    skillsrequired: ["Angular", "React", "Java", "Javascript", "SQL"],
    numberofopenings: 5,
    jobposted: "10/11/2024, 11:00:00 PM",
    applicants: [
      {
        applicantId: 1,
        name: "Ayush Kumar",
        email: "ayush@gmail.com",
        contact: "8252898701",
        resumePath: "1729522850667-Ayush_Kumar_CV.pdf",
      },
    ],
  },
];

// it add the job in the jobs arrays which are posted by recruiter
export const addJobData = (job) => {
  if (!job) {
    return false;
  }
  const {
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    number_of_openings,
    skills_required,
    apply_by,
  } = job;

  const job_posted = postDate();

  const jobData = {
    id: jobs.length + 1,
    jobcategory: job_category,
    jobdesignation: job_designation,
    joblocation: job_location,
    companyname: company_name,
    salary: salary,
    applyby: apply_by,
    skillsrequired: skills_required,
    numberofopenings: number_of_openings,
    jobposted: job_posted,
    applicants: [],
  };

  jobs.push(jobData);
  return true;
};

// it returns all the jobs
export const getJobs = () => {
  return jobs;
};

// getting the job by the id
export const getJobFromId = (jobId) => {
  const jobData = jobs.find((job) => {
    return job.id === jobId;
  });
  // job data is not available with the given id
  if (!jobData) {
    return false;
  }

  return jobData;
};

// updates the job data with the help of Id
export const updateJobData = (jobId, job) => {
  // job data which we want to update
  const currentJobData = getJobFromId(jobId);
  if (!currentJobData) {
    return false;
  }
  currentJobData.jobcategory = job.job_category;
  currentJobData.jobdesignation = job.job_designation;
  currentJobData.joblocation = job.job_location;
  currentJobData.companyname = job.company_name;
  currentJobData.salary = job.salary;
  currentJobData.numberofopenings = job.number_of_openings;
  currentJobData.skillsrequired = job.skills_required;
  currentJobData.applyby = job.apply_by;
  return true;
};

// delte the job with the help of id
export const deleteJobData = (jobId) => {
  if (!jobId) {
    return false;
  }
  jobs = jobs.filter((job) => {
    return job.id !== jobId;
  });
  return true;
};
// creating the date when the job is posted
const postDate = () => {
  const date = new Date();
  // converting the date into appropriate format
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  // converting the time
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  // Determining the AM or PM
  const value = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  // 10/11/2024, 5:25:40 AM
  const formatedTime = `${hours}:${minutes}:${seconds} ${value}`;
  const formatedDate = `${day}/${month}/${year}`;

  return `${formatedDate}, ${formatedTime}`;
};

// ++++++++++++++++++ Applicants Model ++++++++++++++
export const addApplicantToSpecificJobId = (jobId, data) => {
  const job = getJobFromId(jobId);

  if (!job) {
    // If the job is not found, return false
    return false;
  }

  // Add an applicantId based on the current number of applicants
  const applicantId = job.applicants.length + 1;
  const applicantData = { applicantId, ...data };

  // Push the updated data to the applicants array
  job.applicants.push(applicantData);
  // Return true to indicate successful addition
  return true;
};
