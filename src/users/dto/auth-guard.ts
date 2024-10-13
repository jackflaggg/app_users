import {IMiddleware} from "../../common/middleware.interface";
import {NextFunction, Request, Response} from "express";

export class AuthGuard implements IMiddleware{
    execute(req: Request, res: Response, next: NextFunction) : void {
        if (req.user) {
            return next();
        }
        res.status(401).send({errorsMessage: "Not authorized"})
    };
}