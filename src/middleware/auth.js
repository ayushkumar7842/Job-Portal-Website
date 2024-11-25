import { getNameWithEmail } from "../models/userModel.js";

export const auth = (req, res, next) => {
  if (req.session.userEmail) {
    // user is already logged in successfully
    const user = getNameWithEmail(req.session.userEmail);
    if (user) {
      res.locals.username = user.name;
    }

    // check last visit cookies are set if not then set the cookies
    if (req.cookies.lastVisit) {
      res.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    } else {
      res.cookie("lastVisit", new Date().toISOString(), {
        maxAge: 2 * 24 * 60 * 60 * 1000,
      });
    }
  }
  next();
};
