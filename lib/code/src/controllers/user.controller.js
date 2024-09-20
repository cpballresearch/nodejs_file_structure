import UserService from "../services/user.service.js";
import ApiError from "../utils/apierror.utils.js";
import  {Constants}  from "../utils/constant.utils.js";
import { handelDataNotFound, handelLogin, handelServerDataCreated, handelServerDataGet, handelServerSuccess, handleServerError } from "../utils/responsehandler/index.utils.js";

class UserController {
    static async createUser(req, res) {
        const imageName = req.uploadedFiles?.image[0]?.fileName;
        const user = await UserService.createUser({ ...req.body, imageName });
        user ? handelServerDataCreated(res, user) : handelDataInvalid(res);
    }

    static async getRandomKey(req,res){
        const getRandomKeyValue=await UserService.getRandomKey();
        (getRandomKeyValue)? handelServerDataGet(res, getRandomKeyValue):handleServerError(res, new Error(Constants.RANDOM_KEY_FETCH_ERROR_MESSAGE), Constants.HTTPINTERNALSERVERERROR);
    }

    static async loginUser(req, res) {
        const { email, password,randomKey } = req.body;
        const user = await UserService.loginUser(email, password,randomKey);
        if(user===null){
            throw new ApiError(Constants.HTTPNOTFOUND,Constants.FAILED_STATUS,Constants.DATA_NOT_FOUND_MESSAGE);
        }else if(user===false){
            throw new ApiError(Constants.UNAUTHORIZED,Constants.FAILED_STATUS,Constants.INVALID_CREDENTIALS_MESSAGE);
        }else{
            req.session.user = {
                userId: user?.id,
                email: user?.email,
                //* Add other user details if necessary
            };
            handelLogin(res, user);
        }
    }
    static async getUserById(req, res) {

        const user = await UserService.getUserById(req.params.id);
        if (user) {
            handelServerDataGet(res, user);
        } else {
            handelDataNotFound(res);
        }

    }

    static async updateUser(req, res) {
        const imageName = req.uploadedFiles?.image?.[0]?.fileName || null;
        const user = await UserService.updateUser(req.params.id, {...req.body,imageName});
        if (user) {
            handelServerSuccess(res, user, Constants.DATA_UPDATE_SUCCESS_MESSAGE);
        } else {
            handelDataNotFound(res);
        }

    }

    static async deleteUser(req, res) {

        const result = await UserService.deleteUser(req.params.id);
        if (result) {
            handelServerSuccess(res, null, Constants.DATA_DELETE_MESSAGE);
        } else {
            handelDataNotFound(res);
        }

    }
}

export default UserController;
