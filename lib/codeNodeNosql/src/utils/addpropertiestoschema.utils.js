
/**
 * 
 * @param{any} schemaName - this is for schema name where the dynamic properties are going to add ;
 * @param{Array} propertiesName- this is for the dynamic properties field for the specified schema;
 * 
 * 
 */


const addDynamicPropertiesToSchema = (schemaName, propertiesName) => {
    
    for(const{propertyName,options} of propertiesName){
        schemaName.add({[propertyName]:options});
      }

    console.log(`Properties added to ${schemaName} schema:`, propertiesName);
}; 

export default addDynamicPropertiesToSchema;
