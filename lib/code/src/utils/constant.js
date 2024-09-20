class Constants { }

Constants.sessionSecretKey =
  "your_session_secret_key";
Constants.secretKey =
  "your_screct_key";
Constants.success = "Api over all success status";
Constants.failed = "Api over all error status";
Constants.unauthorized = "You Are Not Authorized";
Constants.dataFetch = "Data Fetch Successfully";
Constants.dataSave = "Data Saved Successfully";
Constants.dataDelete = "Data Delete Successfully";
Constants.dataNotFound = "Data Not Found";
Constants.dataUpdataSucess = "Data Update Successfully";
Constants.internalServerError = "Internal Server Error";
Constants.loginSuccess = "Login Success";
Constants.invalidCredentials = "Invalid credentials";
Constants.userDataUpdated = "User Data Updated Successfully";
Constants.userDataNotUpdated = "Data Not Updated";
Constants.packageSave = "Package Saved Successfully";
Constants.errorImage = "Error uploading image";
Constants.errorNoImage = "No image provided";
Constants.somethingWrong = "Something Wrong";
Constants.invalidData = "Please Enter Valid Data";
Constants.unprocessablecontent = "Unprocessable Content";
Constants.accessdenied = "Access denied";

// ?Email
Constants.emailValidate = "Email Send Successfully";
Constants.emailVerificationFailed = "The Otp or EmailId is Wrong";
Constants.domainNotFound = "Domain not found";
Constants.invalidEmailStructure = "Invalid email structure";
Constants.noMxRecords = "No MX records for the domain";
Constants.SMTPConnectionTimeout = "SMTP connection timeout";
Constants.SMTPConnectionError = "SMTP connection error";
Constants.eamilNotVilid = "Email verification failed";
Constants.invalidEmail = "Invalid email address";
Constants.existEmail = "Email Already Exist";
Constants.passwordMismatch = "Password miss match";

// ?InfoCodeEmail
Constants.emailfinishedVerification = 1;
Constants.emailinvalidEmailStructure = 2;
Constants.emailnoMxRecords = 3;
Constants.emailSMTPConnectionTimeout = 4;
Constants.emaildomainNotFound = 5;
Constants.emailSMTPConnectionError = 6;

// ?StatusCode
Constants.HTTPOK = 200;
Constants.HTTPCREATED = 201;
Constants.HTTPNOCONTENT = 204;
Constants.HTTPINTERNALSERVERERROR = 500;
Constants.HTTPBADREQUEST = 400;
Constants.UNAUTHORIZED = 401;
Constants.HTTPFORBIDDEN = 403;

// ?Status
Constants.successStatus = true;
Constants.failedStatus = false;

Constants.emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export default Constants;
