import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Unauthorized request");
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id
        };

        next();
    } catch (error) {
        next(new ApiError(401, "Invalid or expired token"));
    }
};

export default protect;
