import UserRepository from "../repositories/user.repository.js";
import { deletefileFromMinio } from "../utils/filedelete.utils.js";
import Sha512 from "../utils/sha512.utils.js";

class UserService {
    static async createUser(userData) {
        const hashedPassword=await Sha512.Sha512Encryption(userData?.password);
        const createUserDetails= await UserRepository.createUser({
            ...userData,
            password: hashedPassword,
        });
        return createUserDetails;

    }

    static async getRandomKey(){
        const getRandomKeyValue=await Sha512.generateSalt();
        const getEncryptedRandomKeyValue=await Sha512.encryptText(getRandomKeyValue);
        return getEncryptedRandomKeyValue;
    }

    static async loginUser(userEmail, userPassword,randomKey) {
        const getUserDetails=await UserRepository.loginUser(userEmail);
        if (!getUserDetails) {
            return null;
        }
        const {password,...getOtherUserDetails} = getUserDetails;
        const decryptRandomKeyValue=await Sha512.decryptText(randomKey);
        const getPasswordSaltHashed=await Sha512.Sha512Encryption(`${password}#${decryptRandomKeyValue}`);
        return (userPassword===getPasswordSaltHashed) ? getOtherUserDetails :false;
    }

    static async getUserById(userId) {
        return await UserRepository.getUserById(userId);
    }

    static async findByUserEmail(email) {
        return await UserRepository.findByUserEmail(email);
    }

    static async updateUser(userId, updateData) {
        const getUserDetails=await this.getUserById(userId);
        if(!getUserDetails){
            return null;
        }
        let{imageName,password,...otherUpdateData}=updateData;
        
        const hashedPassword=await Sha512.Sha512Encryption(password);

        if(!imageName && imageName===null && imageName===undefined){
            imageName=getUserDetails.imageName;
        }else{
            await deletefileFromMinio(getUserDetails.folderName,getUserDetails.imageName);
            imageName;
        }        
        const updateUserDetails= await UserRepository.updateUser(userId,{
            ...otherUpdateData,
            password: hashedPassword,
            imageName
        });
        return updateUserDetails;
    }

    static async toggleActive(userId){
        return await UserRepository.toggleActive(userId);
    }

    static async toggleDelete(userId){
        return await UserRepository.toggleDelete(userId);
    }

    static async findAllUsers(page,limit){
        return await UserRepository.findAllUsers(page,limit);
    }
}

export default UserService;