import jwt from "jsonwebtoken";
import { promisify } from "util";

import authconfig from "../../config/auth";

export default async (req, res, next) => {
    const autHeader = req.headers.authorization;
    if (!autHeader) {
        return res.status(401).json({ error: "Token not provided" });
    }
    const [, token] = autHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authconfig.secret);
        req.userId = decoded.id;
        return next();    
    } catch (error) {
        return res.status(401).json({ error: error.response});
    }
}