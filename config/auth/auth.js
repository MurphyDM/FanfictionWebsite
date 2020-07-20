const crypto = require('crypto');
const jwt = require('jsonwebtoken');

    function generateSalt(){
        return crypto.randomBytes(16).toString('hex');
    }

    function generateHash(password, salt) {
        return crypto.pbkdf2Sync(password, salt, 10000, 16, 'sha512').toString('hex');
    }

    function validatePassword(password) {
        const hash = this.generateHash(password);
        return this.hash === hash;
    }

    function generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);
      
        return jwt.sign({
          email: this.email,
          id: this._id,
          exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');
    }


module.exports = {
    generateSalt, 
    generateHash,
    validatePassword,
    generateJWT
} 
