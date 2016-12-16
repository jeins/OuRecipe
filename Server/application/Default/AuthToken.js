import jwt from 'jsonwebtoken';
import config from '../../config/config';

class AuthToken {
    static createToken(user){
        let expires = AuthToken.setExpiresIn(7);
        let token = jwt.sign({
            exp: expires,
            data: user
        }, config.secret);

        return {
            user: user,
            token: token,
            expires: expires
        }
    }

    static setExpiresIn(numDays) {
        let dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
    }

    static decodeToken(token){
        return jwt.verify(token, config.secret);
    }
}

module.exports = AuthToken;