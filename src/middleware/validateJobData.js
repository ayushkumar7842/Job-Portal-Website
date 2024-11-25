export const validateJobData = (req, res, next) => {
  const {
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    number_of_openings,
    skills_required,
    apply_by,
  } = req.body;
  let errors = [];
  // job category is not provided
  if (!job_category) {
    errors.push("Invalid job category");
  }
  // job designation is not valid
  if (!job_designation) {
    errors.push("Invalid job designation");
  }

  // job location
  if (!job_location) {
    errors.push("Enter the valid location");
  }

  // remaining details
  if (
    !company_name ||
    !salary ||
    !number_of_openings ||
    !skills_required ||
    !apply_by
  ) {
    errors.push("fill the data properly");
  }

  if (errors.length != 0) {
    res.render("customError", { errorMsg: errors[0] });
  } else {
    // if all the data is valid then call the next ()
    next();
  }
};
