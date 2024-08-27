class Constants { }




Constants.sessionSecretKey = 'b04aee415d8f55c0252b4e40fe4e34d9e316b3787a1c69e0373f02d93b48f8d6';
Constants.secretKey = 'b04aee415d8f55c0252b4e40fe4e34d9e316b3787a1c69e0373f02d93b48f8d6';
Constants.success = 'Api over all success status';
Constants.failed = 'Api over all error status';
Constants.unauthorized = 'You Are Not Authorized';
Constants.dataFetch = 'Data Fetch Successfully';
Constants.dataSave = 'Data Saved Successfully';
Constants.dataDelete = 'Data Delete Successfully';
Constants.dataNotFound = 'Data Not Found';
Constants.dataUpdataSucess = 'Data Update Successfully';
Constants.internalServerError = 'Internal Server Error';
Constants.loginSuccess = 'Login Success';
Constants.invalidCredentials = 'Invalid credentials';
Constants.userDataUpdated = 'User Data Updated Successfully';
Constants.userDataNotUpdated = 'Data Not Updated';
Constants.packageSave = 'Package Saved Successfully';
Constants.errorImage = 'Error uploading image';
Constants.errorNoImage = 'No image provided';
Constants.somethingWrong = 'Something Wrong';
Constants.invalidData = 'Please Enter Valid Data';
Constants.unprocessablecontent = "Unprocessable Content";
Constants.accessdenied = 'Access denied';


//?Email
Constants.emailValidate = 'Email Send Successfully';
Constants.emailVerificationFailed = "The Otp or EmailId is Wrong";
Constants.domainNotFound = 'Domain not found';
Constants.invalidEmailStructure = 'Invalid email structure';
Constants.noMxRecords = 'No MX records for the domain';
Constants.SMTPConnectionTimeout = 'SMTP connection timeout';
Constants.SMTPConnectionError = 'SMTP connection error';
Constants.eamilNotVilid = 'Email verification failed';
Constants.invalidEmail = 'Invalid email address';
Constants.existEmail = 'Email Already Exist';
Constants.passwordMismatch = 'Password miss match';

//?model
Constants.jalaSathiUniqueErrorMessage = "Jalasathi id must be unique";
Constants.userEmailUniqueErrorMessage = "User already exist";

//?roleName
Constants.AM = "am";
Constants.JALASATHI = "jalasathi";
Constants.SECTIONOFFICER = "sectionofficer";
Constants.LAB = "lab";
Constants.ADMIN = "admin";
Constants.SUPERADMIN = "superadmin";
Constants.ADMINID = "e05fdb79-8539-4063-adab-7ae333ebb117";
Constants.SUPERADMINID = "5bea116c-3511-4098-9062-d21ca02fe164";
Constants.LABID = "563d768c-587a-46da-a60c-8ec1587be52f";

//?Role Module
Constants.ROLEFILDSREQUIRED = "Role name and description are required";


//?InfoCodeEmail
Constants.emailfinishedVerification = 1;
Constants.emailinvalidEmailStructure = 2;
Constants.emailnoMxRecords = 3;
Constants.emailSMTPConnectionTimeout = 4;
Constants.emaildomainNotFound = 5;
Constants.emailSMTPConnectionError = 6;


//?StatusCode
Constants.HTTPOK = 200;
Constants.HTTPCREATED = 201;
Constants.HTTPNOCONTENT = 204;
Constants.HTTPINTERNALSERVERERROR = 500;
Constants.HTTPBADREQUEST = 400;
Constants.UNAUTHORIZED = 401;
Constants.HTTPFORBIDDEN = 403;

//?Status
Constants.successStatus = true;
Constants.failedStatus = false;

Constants.emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

Constants.userSource = "user";
Constants.testReportSource = "TestReports";
Constants.testReportByLabSource = "TestReportsByLab"

export default Constants;
