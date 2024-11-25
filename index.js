import express, { urlencoded } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import UserController from "./src/controllers/userController.js";
import JobController from "./src/controllers/jobController.js";
import { auth } from "./src/middleware/auth.js";
import { validateJobData } from "./src/middleware/validateJobData.js";
import { uploadFile } from "./src/middleware/fileUpload.js";
import { validateApplicant } from "./src/middleware/validateApplicant.js";

dotenv.config();
const app = express();

// Middleware configuration
app.use(express.static("public"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));

// Session configuration
app.use(
  session({
    secret: "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Cookie middleware
app.use(cookieParser());

// Middleware
app.use(auth);

// Controllers
const userController = new UserController();
const jobController = new JobController();

// Auth routes
app.get("/", (req, res) => res.render("home"));
app.get("/register", userController.getRegister);
app.post("/register", userController.postRegister);
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);
app.get("/logout", userController.getLogout);

// Job routes
app
  .route("/jobs")
  .get(jobController.getAllJobs)
  .post(validateJobData, jobController.createJob);

app
  .route("/jobs/:id")
  .get(jobController.getJobWithId)
  .post(validateJobData, jobController.postUpdateJob)
  .delete(jobController.deleteJobWithId);

app.get("/postjob", jobController.getPostJobView);
app.get("/jobs/:id/update", jobController.getUpdateJobView);

// Applicant routes
app
  .route("/jobs/:id/applicants")
  .get(jobController.getAllApplicants)
  .post(
    uploadFile.single("resume"),
    validateApplicant,
    jobController.addApplicants
  );

// Search route
app.get("/search", jobController.searchJobs);

// Error handling (optional but recommended)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).send("Something went wrong!");
});

export default app;
