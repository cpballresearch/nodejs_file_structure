import { models } from "../models/index.model.js";
class UserRepository {
    static async createUser(userData) {
        return await models.User.create(userData);
    }

    static async loginUser(email){
        return await models.User.findOne({email,isActive:true,isDelete:false},{__v:0}).populate("roles",{name:1}).lean();
    }
    static async getUserById(userId) {
        return await models.User.findById(userId,{password:0,__v:0});
    }

    static async findByUserEmail(email) {
        return await models.User.findOne({email},{__v:0});
    }

    static async updateUser(userId, updateData) {
        const updateUserDetails=await models.User.findByIdAndUpdate(userId,{$set:{...updateData}},{new:true});
        return updateUserDetails;
    }

    static async toggleActive(userId){
        const getUserDetails=await models.User.findById(userId,{isActive:1});
        if(!getUserDetails){
            return null;
        }
        getUserDetails.isActive=!getUserDetails.isActive;
        return await getUserDetails.save();
    }

    static async toggleDelete(userId){
        const getUserDetails=await models.User.findById(userId,{isDelete:1});
        if(!getUserDetails){
            return null;
        }
        getUserDetails.isDelete=!getUserDetails.isDelete;
        return await getUserDetails.save();
    }

    

    static async findAllUsers(page,limit){
        const skip = (page - 1) * limit; 
        const getAllUsersData=await models.User.find({isActive: {$eq:true},isDelete:{$ne:true}},{password:0,__v:0}).skip(skip).limit(limit);
        const totalDocuments = await models.User.countDocuments({ isActive: {$eq:true}, isDelete:{$ne:true} });
        const totalPages = Math.ceil(totalDocuments / limit);
        return {
            getAllUsersData,
            currentPage:page,
            totalPages,
            totalDocuments
        };
    }
}

export default UserRepository;