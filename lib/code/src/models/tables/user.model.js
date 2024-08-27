import { DataTypes } from "sequelize";

export default (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        folderName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "UserImage"
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'users',
        timestamps: true, // Adds `createdAt` and `updatedAt` timestamps
    });
};
