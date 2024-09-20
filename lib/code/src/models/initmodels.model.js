import userModel from "./tables/user.model.js";


export default (sequelize) => {
    const models = {};

    //* Initialize models
    models.User = userModel(sequelize);


    //* Define associations


    return models;
};
