import userModel from "./tables/user.model.js";

export default (mongooseConnection) => {
    const models = {};

    //* Initialize models
    models.User = userModel(mongooseConnection,"User",[
        {
            name:{
                type:String,
                required:[true,"Name is required"]
            },
            phoneNumber:{
                type:String,
                required:[true,"Phone number is required"]
            },
            email:{
                type:String,
                unique:true,
                required:[true,"Email is required"]
            },
            imageName:{
                type:String,
                required:[true,"Phone number is required"]
            },
            folderName:{
                type:String,
                default:process.env.USER_FOLDER,
                required:true
            },
            password:{
                type:String,
                required:[true,"Password is required"]
            },
            roles:[{
                type:mongooseConnection.Schema.Types.ObjectId,
                ref:"Role",
                default:[],
                required:true
            }],
            isActive:{
                type:Boolean,
                default:true,
                required:true
            },
            isDelete:{
                type:Boolean,
                default:false,
                required:true
            },
        },
    ]);
    //* Define associations
    return models;
};
