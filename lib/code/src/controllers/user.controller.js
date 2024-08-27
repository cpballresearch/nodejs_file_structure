import UserService from "../services/user.service.js";
import { handelLogin, handelServerDataCreated, handelServerDataGet, handelServerSuccess } from "../utils/responseHandler/index.js";

class UserController {
    static async createUser(req, res) {
        const imageName = req.uploadedFiles?.image[0]?.fileName;
        const user = await UserService.createUser({ ...req.body, imageName });
        user ? handelServerDataCreated(res, user) : handelDataInvalid(res);
    }

    static async loginUser(req, res) {
        const { email, password } = req.body;
        const user = await UserService.loginUser(email, password);
        req.session.user = {
            userId: user.id,
            email: user.email,
            //* Add other user details if necessary
        };
        handelLogin(res, user);
    }
    static async getUserById(req, res) {

        const user = await UserService.getUserById(req.params.id);
        if (user) {
            handelServerDataGet(res, user);
        } else {
            handelServerError(res, new Error('User not found'), 404);
        }

    }

    static async updateUser(req, res) {

        const user = await UserService.updateUser(req.params.id, req.body);
        if (user) {
            handelServerSuccess(res, user, 'User updated successfully');
        } else {
            handelServerError(res, new Error('User not found'), 404);
        }

    }

    static async deleteUser(req, res) {

        const result = await UserService.deleteUser(req.params.id);
        if (result) {
            handelServerSuccess(res, null, 'User deleted successfully');
        } else {
            handelServerError(res, new Error('User not found'), 404);
        }

    }
}

export default UserController;
