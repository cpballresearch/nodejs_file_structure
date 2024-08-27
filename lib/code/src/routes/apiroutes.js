import express from 'express';

import UserController from '../controllers/user.controller.js';
import authenticateToken from '../middleware/authMiddleware.js';
import fileUpload from '../middleware/fileuploader.middleware.js';


const apiRoute = express.Router();
//* Don't Remove This This Is Used For Global Error Handler
const use = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

//*Multiple Field
// const uploadFieldsUser = [
//     { name: "image", maxCount: 1, folderName: "UserImage", isOptional: false },
//     { name: "adharcardImage", maxCount: 1, folderName: "UserAdharCard", isOptional: true },
//     { name: "pancardImage", maxCount: 1, folderName: "UserPanCard", isOptional: true }
// ];
//*Single Field
const uploadFieldsUser = [
    { name: "image", maxCount: 1, folderName: "UserImage", isOptional: false },
];

apiRoute.post('/createUser', fileUpload(uploadFieldsUser), use(UserController.createUser));
apiRoute.post('/loginUser', use(UserController.loginUser));
apiRoute.get('/getUserById/:id', authenticateToken, use(UserController.getUserById));
apiRoute.put('/updateUserById/:id', authenticateToken, use(UserController.updateUser));
apiRoute.delete('/deleteUserById/:id', authenticateToken, use(UserController.deleteUser));

export default apiRoute;
