import UserRepository from "../repositories/user.repository.js";
import { deletefileFromMinio } from "../utils/filedelete.utils.js";
import Sha512 from "../utils/sha512.utils.js";

class UserService {
    static async createUser(userData) {
        const hashedPassword=await Sha512.Sha512Encryption(userData?.password);
        return await UserRepository.createUser({
            ...userData,
            password: hashedPassword,
        });
    }

    static async getRandomKey(){
      const getRandomKeyValue=await Sha512.generateSalt();
      const getEncryptedRandomKeyValue=await Sha512.encryptText(getRandomKeyValue);
      return getEncryptedRandomKeyValue;
  }

  static async loginUser(email, inputPassword,randomKey) {
      const user = await UserRepository.getUserByEmail(email);
      
      // if the user doesn't exist then return null
      if(!user) return null;

      const{password,...otherUserDetails}=user.toJSON();
      const decryptRandomKeyValue=await Sha512.decryptText(randomKey);
      const getPasswordSaltHashed=await Sha512.Sha512Encryption(`${password}#${decryptRandomKeyValue}`);
      return (inputPassword===getPasswordSaltHashed) ? otherUserDetails :false;
  }

  static async getUserById(userId) {
    return await UserRepository.getUserById(userId);
  }

  static async updateUser(userId, updateData) {
        
    //first get the user details
    const getUserDetails=await this.getUserById(userId);
    // if the user details is not present then return null
    if(!getUserDetails){
        return null;
    }

    const hashedPassword=await Sha512.Sha512Encryption(updateData?.password);


    // destructing the updateData object
    let {imageName,password,...otherUpdateData}=updateData;

    //checking the imageName is present or comming as null or undefined
    if(!imageName && imageName===null || imageName===undefined){
        imageName=getUserDetails.imageName;
    }else{
        await deletefileFromMinio(getUserDetails.folderName,getUserDetails.imageName);
        imageName;
    }

    return await UserRepository.updateUser(userId, {...otherUpdateData,password:hashedPassword,imageName});
}

static async deleteUser(userId) {
    return await UserRepository.deleteUser(userId);
}

static async toggleActive(userId){
    const toggleActiveDetails=await UserRepository.toggleActive(userId);
    return toggleActiveDetails || null;
}

static async toggleDelete(userId){
  const toggleDeleteDetails=await UserRepository.toggleDelete(userId);
  return toggleDeleteDetails || null;
}

}

export default UserService;
