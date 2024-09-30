import {Request, Response, NextFunction, Router} from "express";

export const userRouter = Router();

userRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log('обработчик users');
    next()
});

userRouter.post("/login", (req: Request, res: Response) => {
    res
        .status(201)
        .send('login')
    return
})

userRouter.post("/register", (req: Request, res: Response) => {
    res
        .status(201)
        .send('register')
    return
})