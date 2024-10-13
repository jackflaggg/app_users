import dotenv from "dotenv";
dotenv.config();

export const Settings = {
    secretKey: process.env.SECRET_KEY!,
}