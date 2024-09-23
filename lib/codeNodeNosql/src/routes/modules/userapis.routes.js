import UserController from '../../controllers/user.controller.js';
import fileUpload from '../../middleware/fileuploader.middleware.js';


export default (router)=>{
    router.post("/createuserinfo",fileUpload([
        { name: "image", maxCount: 1, folderName:process.env.USER_FOLDER, isOptional: false },
    ]),UserController.createUser);
    router.post("/userlogin",UserController.loginUser);
    router.get("/getrandomkeyforuser",UserController.getRandomKey);
    router.get("/getuserinfo/:userId",UserController.getUserById);
    router.get("/getalluserinfo",UserController.findAllUsers);
    router.put("/updateuserinfo/:userId",fileUpload([
        { name: "image", maxCount: 1, folderName:process.env.USER_FOLDER, isOptional: true },
    ]),UserController.updateUser);
    router.put("/toggleactiveuserinfo/:userId",UserController.toggleActive);
    router.delete("/deleteuserinfo/:userId",UserController.toggleDelete);
}