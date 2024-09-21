<<<<<<< HEAD:lib/code/src/security/session.security.js
import session from 'express-session';


const sessionCustom = session({
    secret:process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week (in milliseconds)
    }
=======
import session from "express-session";
import Constants from "../utils/constant.js";

const sessionCustom = session({
  secret: Constants.sessionSecretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week (in milliseconds)
  }
>>>>>>> b48e342eca147f4fd2daf88fec3c62800a7e3a43:lib/code/src/security/session.js
});

export default sessionCustom;
