import UserService from "../services/user.service.js";
import ApiError from "../utils/apierror.utils.js";
import  {Constants}  from "../utils/constant.utils.js";
import { handelDataNotFound, handelLogin, handelServerDataCreated, handelServerDataGet, handelServerSuccess, handleServerError } from "../utils/responsehandler/index.utils.js";

class UserController {
  static async createUser(req, res) {
    const imageName = req.uploadedFiles?.image[0]?.fileName;
    const{name,phoneNumber,email,password,roles}=req.body;
    const user=await UserService.createUser({name,phoneNumber,email,imageName,password,roles});
    user ? handelServerDataCreated(res, user) : handelDataInvalid(res);
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
            userId: user?._id,
            email: user?.email,
            //* Add other user details if necessary
        };
        handelLogin(res, user);
    }
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
                userId: user?._id,
                email: user?.email,
                //* Add other user details if necessary
            };
            handelLogin(res, user);
        }
    }
    static async getUserById(req, res) {
        const userId=req?.params?.userId;
        const user = await UserService.getUserById(userId);
        if (user) {
            handelServerSuccess(res, user, Constants.DATA_UPDATE_SUCCESS_MESSAGE);
        } else {
            handelDataNotFound(res);
        }
        
    }

    static async updateUser(req, res) {
        const userId=req?.params?.userId;
        const imageName = req.uploadedFiles?.image?.[0]?.fileName || null;
        const{name,phoneNumber,email,password,roles}=req.body;
        const user = await UserService.updateUser(userId,{name,phoneNumber,email,imageName,password,roles});
        if (user) {
            handelServerSuccess(res, user, Constants.DATA_UPDATE_SUCCESS_MESSAGE);
        } else {
            handelDataNotFound(res);
        }

    }

    static async findByUserEmail(req,res){
        const userEmail=req?.params?.userEmail;
        const user=await UserService.findByUserEmail(userEmail);
        user? handelServerDataGet(res, user): handelDataNotFound(res);
    }

    static async findAllUsers(req,res){
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const getAllUsersDetailsData=await UserService.findAllUsers(page,limit);
        getAllUsersDetailsData? handelServerDataGet(res, getAllUsersDetailsData): handelDataNotFound(res);
    }
     
    static async toggleActive(req,res){
        const userId=req?.params?.userId;
        const toggleActiveStatus=await UserService.toggleActive(userId);
        const status=toggleActiveStatus.isActive?Constants.DATA_ACTIVE_SUCCESS_MESSAGE:Constants.DATA_INACTIVE_SUCCESS_MESSAGE;
        toggleActiveStatus ? handelServerSuccess(res, null, status):handelDataNotFound(res);
    }

    static async toggleDelete(req,res){
        const userId=req?.params?.userId;
        const toggleDeleteStatus=await UserService.toggleDelete(userId);
        const status=toggleDeleteStatus.isDelete?Constants.DATA_DELETE_MESSAGE:Constants.DATA_REVOKE_SUCCESS_MESSAGE;
        toggleDeleteStatus ? handelServerSuccess(res, null, status):handelDataNotFound(res);
    }
}

export default UserController;

