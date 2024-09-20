class ApiError extends Error {
    constructor(statusCode = 500, status = false, message = "Something went wrong") {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
    }
}

export default ApiError;