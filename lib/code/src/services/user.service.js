import AuthHashPassword from "../middleware/authHashPassword.js";
import UserRepository from "../repositories/user.repository.js";

class UserService {
  static async createUser(userData) {
    const salt = AuthHashPassword.generateSalt();
    const hashedPassword = await AuthHashPassword.hashPassword(
      userData.password,
      salt
    );
    return await UserRepository.createUser({
      ...userData,
      password: hashedPassword,
      salt: salt
    });
  }

  static async loginUser(email, inputPassword) {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await AuthHashPassword.checkPassword(
      inputPassword,
      user.password,
      user.salt
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return user;
  }

  static async getUserById(userId) {
    return await UserRepository.getUserById(userId);
  }

  static async getUserByEmail(email) {
    return await UserRepository.getUserByEmail(email);
  }

  static async updateUser(userId, updateData) {
    return await UserRepository.updateUser(userId, updateData);
  }

  static async deleteUser(userId) {
    return await UserRepository.deleteUser(userId);
  }
}

export default UserService;
