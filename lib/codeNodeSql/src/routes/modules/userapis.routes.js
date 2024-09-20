import UserController from "../../controllers/user.controller.js";
import authenticateToken from "../../middleware/auth.middleware.js";
import fileUpload from "../../middleware/fileuploader.middleware.js";



export default (router)=>{
    router.post('/createUser', fileUpload([
        { name: "image", maxCount: 1, folderName:process.env.USER_FOLDER, isOptional: false },
    ]), UserController.createUser);
    router.post('/loginUser', UserController.loginUser);
    router.get('/getrandomkey', UserController.getRandomKey);
    router.get('/getUserById/:id', authenticateToken, UserController.getUserById);
    router.put('/updateUserById/:id', authenticateToken, fileUpload([
        { name: "image", maxCount: 1, folderName:process.env.USER_FOLDER, isOptional: true },
    ]),UserController.updateUser);
    router.delete('/deleteUserById/:id', authenticateToken, UserController.deleteUser);
}