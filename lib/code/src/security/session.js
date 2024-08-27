import session from 'express-session';
import Constants from '../utils/constant.js';

const sessionCustom = session({
    secret: Constants.sessionSecretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week (in milliseconds)
    }
});

export default sessionCustom;
