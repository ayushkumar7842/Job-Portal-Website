import { addUser, authenticateUser } from "../models/userModel.js";

export default class UserController {
  // render the register page
  getRegister = (req, res) => {
    res.render("register");
  };
  //render the login page
  getLogin = (req, res) => {
    res.render("login");
  };
  // register a new user
  postRegister = (req, res) => {
    // get the data
    const { name, email, password } = req.body;
    // validate the data
    if (!name || !email || !password) {
      return res.render("customError", {
        errorMsg: "enter the details",
      });
    }
    // perform operation
    addUser(req.body);
    res.render("login");
  };
  // user wants to log-in
  postLogin = (req, res) => {
    const isAuth = authenticateUser(req.body);
    // if the recruiter is valid then render the jobs page
    if (isAuth) {
      req.session.userEmail = req.body.email;
      res.redirect("/jobs");
    } else {
      res.render("customError", { errorMsg: "Invalid Credentials" });
    }
  };

  // when users logout render the login page
  getLogout = (req, res) => {
    req.session.destroy((err) => {
      if (err) res.status(401).send(err);
      else res.redirect("/login");
    });
  };
}
