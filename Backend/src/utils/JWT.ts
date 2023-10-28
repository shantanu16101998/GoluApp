const jwt = require('jsonwebtoken');
import { JWT_SECRET_KEY } from '../config/mongo';
import logger from './logger';

function jwtSign(payload: any, expiryInMins: number) {
    try {
        let signedPayload = jwt.sign(payload, JWT_SECRET_KEY, Math.floor(expiryInMins) * 60);
        return signedPayload;
    } catch (err) {
        logger.error("Signing of payload failed with error : ", err);
        return err;
    }
}

function jwtVerify(token: string) {
    return jwt.verify(token, JWT_SECRET_KEY, (err: any, succ: any) => {
        if (err) {
            logger.error("JWT verification failed with error: " + err);
            return false;

        } else if (succ) {
            return true;
        } else {
            logger.error("Something went extremely wrong with JWT verification");
            return false;
        }
    });
}

module.exports = {
    jwtSign,
    jwtVerify
}