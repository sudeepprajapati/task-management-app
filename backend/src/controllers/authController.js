import User from "../models/User.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidEmail, isStrongPassword } from "../utils/validators.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        if (!isValidEmail(email)) {
            throw new ApiError(400, "Invalid email format");
        }

        if (!isStrongPassword(password)) {
            throw new ApiError(400, "Password must be at least 6 characters long");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new ApiError(409, "User already exists");
        }

        const user = await User.create({ email, password });

        const token = generateToken(user._id);

        return res.status(201).json(
            new ApiResponse(
                201,
                { token },
                "User registered successfully"
            )
        );
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, "User does not exist");
        }

        const isPasswordValid = await user.matchPassword(password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid user credentials");
        }

        const token = generateToken(user._id);

        return res.status(200).json(
            new ApiResponse(
                200,
                { token },
                "User logged in successfully"
            )
        );
    } catch (error) {
        next(error);
    }
};
