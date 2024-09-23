import { models } from "../models/index.model.js";
class UserRepository {
  static async createUser(userData) {
    return await models.User.create(userData);
  }

  static async getUserById(userId) {
    return await models.User.findByPk(userId);
  }

  static async getUserByEmail(email) {
    return await models.User.findOne({ where: { email } });
  }

  static async updateUser(userId, updateData) {
    const user = await this.getUserById(userId);
    if (user) {
      return await user.update(updateData);
    }

    return null;
  }

  static async deleteUser(userId) {
    const user = await this.getUserById(userId);
    if (user) {
      return await user.destroy();
    }
  }

  static async toggleActive(userId){
    const getUserDetails=await this.getUserById(userId);
    if(!getUserDetails){
      return null;
    }
    getUserDetails.isActive=!getUserDetails.isActive;
    return await getUserDetails.save();
  }

  static async toggleDelete(userId){
    const getUserDetails=await this.getUserById(userId);
    if(!getUserDetails){
      return null;
    }
    getUserDetails.isDelete=!getUserDetails.isDelete;
    return await getUserDetails.save();
  }

}

export default UserRepository;
