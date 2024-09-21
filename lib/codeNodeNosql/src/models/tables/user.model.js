export default (mongooseConnection,modelName,documentPropertiesOptions,documentName=`${modelName.toLowerCase()}_details`)=>{

    if(Object.hasOwn(mongooseConnection.models,modelName)){
        mongooseConnection.deleteModel(modelName);
    }
    
    return mongooseConnection.model(modelName,new mongooseConnection.Schema(documentPropertiesOptions,{
        timestamps:true,
        strict:true,
        collection: documentName
    }));
}

