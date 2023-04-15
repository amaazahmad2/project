import { RequestHandler } from "express";
import UserModel from "../models/userModel";
import { comparePassword, encryptPassword } from "../utils/commonUtils";
import { generateToken } from "../utils/jwtUtils";

export const loginUser: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;

        //checking the user existance
        const user = await UserModel.findOne({
            username: payload.username,
        });

        if (!user)
            return res.status(401).json({
                message: "Invalid Credentials",
            });

        //checking the passwordMatch
        const check = await comparePassword(
            payload.password,
            user.password as string
        );

        if (!check)
            return res.status(401).json({ message: "Invalid Credentials" });

        const data = {
            username: user.username,
        };

        const token = generateToken(data);

        res.status(200).json({ token, data });
    } catch (error: unknown) {
        next(error);
    }
};

export const registerUser: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;

        const user = await UserModel.findOne({
            username: payload.username,
        });
        if (user) {
            return res.status(500).json({ message: "User Already Exist" });
        }

        const password = await encryptPassword(payload.password as string, 12);

        await UserModel.create({
            ...payload,
            password,
        });
        return res.status(200).json({ message: "User Registered" });
    } catch (error: unknown) {
        next(error);
    }
};
