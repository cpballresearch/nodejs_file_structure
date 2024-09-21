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

<<<<<<< HEAD
    static async getUserByEmail(email) {
        return await models.User.findOne({ where: { email } });
    }

    static async updateUser(userId, updateData) {
        const user = await this.getUserById(userId);
        if (user) {
            const updatedUserData=await user.update(updateData);
            const{password,...otherUpdatedData}=updatedUserData.toJSON();
            return otherUpdatedData;
        }
        return null;
    }

    static async deleteUser(userId) {
        const user = await this.getUserById(userId);
        if (user) {
            return await user.destroy();
        }
        return null;
    }
=======
    return null;
  }
>>>>>>> b48e342eca147f4fd2daf88fec3c62800a7e3a43
}

export default UserRepository;
