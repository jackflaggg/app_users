import {Request, Response, NextFunction} from "express";

export const userRouter = async (req: Request, res: Response) => {
    const users = [1, 2 , 4];
    res.
        status(200).json(users);
    return
}