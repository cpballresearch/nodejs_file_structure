import url from "url";
import { handelBadRequest } from "../utils/responseHandler/index.js";

//* Define the middleware function
export default function requestInterceptorDataValidation(req, res, next) {
  console.log(req.originalUrl + " - Check data sanctity");

  const urlString = req.originalUrl;

  //* Check for malicious characters in URL
  if (urlString.includes("%") || urlString.includes("script")) {
    handelBadRequest(res); // Bad request
    return;
  }

  //* Parse query parameters from the URL
  const parsedUrl = url.parse(req.originalUrl, true);
  const queryParams = parsedUrl.query;

  for (const key in queryParams) {
    if (Object.hasOwnProperty.call(queryParams, key)) {
      const values = Array.isArray(queryParams[key])
        ? queryParams[key]
        : [queryParams[key]];
      for (const val of values) {
        if (!/^[a-zA-Z0-9\s_@.-]*$/.test(val) || val.includes("--")) {
          handelBadRequest(res); // Bad request
          return;
        }
      }
    }
  }

  next();
}
