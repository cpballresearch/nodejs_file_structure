import UserController from '../../controllers/user.controller.js';


export default (router)=>{
    router.post("/createuserinfo",UserController.createUser);
    router.post("/userlogin",UserController.loginUser);
    router.get("/getrandomkeyforuser",UserController.getRandomKey);
    router.get("/getuserinfo/:userId",UserController.getUserById);
    router.get("/getalluserinfo",UserController.findAllUsers);
    router.put("/updateuserinfo/:userId",UserController.updateUser);
    router.put("/toggleactiveuserinfo/:userId",UserController.toggleActive);
    router.delete("/deleteuserinfo/:userId",UserController.toggleDelete);
}