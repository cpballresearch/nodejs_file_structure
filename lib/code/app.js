//* Dynamically import 'express-async-errors' to enable async error handling
await import('express-async-errors');
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import  helmet  from 'helmet';
import errorHandler from './src/middleware/errorHandelerMiddleware.js';
import apiRoute from './src/routes/apiroutes.js';
import requestInterceptorDataValidation from './src/security/requestInterceptorDataValidation.js';
import sessionCustom from './src/security/session.js';
import logger from './src/utils/logger.js';
import limiter from './src/security/limiter.js';



const app = express();


app.use(express.json());
app.use(cors());
app.use(sessionCustom);
app.use(`/${process.env.MAIN_ROUTE}`, apiRoute);

app.use(errorHandler);

app.use(requestInterceptorDataValidation);

app.use(limiter)
//*Content Security Policy (CSP)
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
    }
}));

//*HTTP Strict Transport Security (HSTS)
app.use(helmet.hsts({
    maxAge: 63072000, // 2 years in seconds
    includeSubDomains: true,
    preload: true
}));

//*X-Content-Type-Options
app.use(helmet.xContentTypeOptions());

//*Referrer-Policy X-Frame-Options
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));



app.listen(process.env.PORT, async () => {
    logger.info(`App is Running ON PORT =>${process.env.PORT}`);
});