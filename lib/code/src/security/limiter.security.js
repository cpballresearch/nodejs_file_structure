<<<<<<< HEAD:lib/code/src/security/limiter.security.js
import rateLimit from 'express-rate-limit';
import { handelTooMayRequest } from '../utils/responsehandler/index.utils.js';

=======
import rateLimit from "express-rate-limit";
import { handelTooMayRequest } from "../utils/responseHandler/index.js";
>>>>>>> b48e342eca147f4fd2daf88fec3c62800a7e3a43:lib/code/src/security/limiter.js

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    return handelTooMayRequest(res);
  }
});

export default limiter;
