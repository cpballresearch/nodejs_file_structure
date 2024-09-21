import crypto from "crypto";

class Sha512{
    static secretKey=process.env.SECRETEKEY;
    static initVector=process.env.INITVECTOR;
    constructor(){
        // make secretKey only readonly property
        Object.defineProperty(Sha512,"secretKey",{
            writable:false,
            configurable:false
        });

        // make initVector only readonly property
        Object.defineProperty(Sha512,"initVector",{
            writable:false,
            configurable:false
        });
    }

    // for generate the random salt 
    static async generateSalt(){
        return await crypto.randomBytes(this.secretKey.length).toString(process.env.ENCODING_TYPE);
    }

    // for hashing the password with the iterations
    static async Sha512Encryption(password,iterations=process.env.ITERATIONS){
        const hash=crypto.createHash(process.env.HASH_ALGORITHM);
        const finalHash=Array(iterations).fill(0).map(()=>hash.update(password)).reduce((acc,cur)=>cur,hash);
        const digest=finalHash.digest(process.env.ENCODING_TYPE);
        return digest;
    }

    // for encrypt the random key(salt)
    static async encryptText(textValue){
       const cipher=crypto.createCipheriv(process.env.CIPHER_CCM_TYPES_ALGORITHM,this.secretKey,this.initVector);
       const encryptedData=cipher.update(textValue,process.env.INPUT_ENCODING_TYPE,process.env.OUTPUT_ENCODING_TYPE)+cipher.final(process.env.OUTPUT_ENCODING_TYPE);
       return encryptedData;
    }

    // for decrypt the random key(salt)
    static async decryptText(encryptedText){
        const decipher=crypto.createDecipheriv(process.env.CIPHER_CCM_TYPES_ALGORITHM,this.secretKey,this.initVector);
        const decryptedData=decipher.update(encryptedText,process.env.OUTPUT_ENCODING_TYPE,process.env.INPUT_ENCODING_TYPE)+decipher.final(process.env.INPUT_ENCODING_TYPE);
        return decryptedData;
    }
}

export default Sha512;