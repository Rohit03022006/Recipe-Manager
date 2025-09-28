import { User } from "../models/user.js"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "login required" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.userId = user._id;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};