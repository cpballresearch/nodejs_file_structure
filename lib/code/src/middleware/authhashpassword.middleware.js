import crypto from 'crypto';

class AuthHashPassword {

    static generateSalt(length = 16) {
        return crypto.randomBytes(length).toString('hex');
    }

    //* Function to hash a password with a given salt
    static hashPassword(password, salt, iterations = 10000, keyLength = 64) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, iterations, keyLength, 'sha512', (err, derivedKey) => {
                if (err) return reject(err);
                resolve(derivedKey.toString('hex'));
            });
        });
    }

    //* Function to check if the provided password matches the stored hashed password
    static async checkPassword(inputPassword, storedHashedPassword, salt, iterations = 10000, keyLength = 64) {
        const hashedInputPassword = await AuthHashPassword.hashPassword(inputPassword, salt, iterations, keyLength);
        return hashedInputPassword === storedHashedPassword;
    }
}

export default AuthHashPassword;