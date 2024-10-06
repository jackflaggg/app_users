import {IMiddleware} from "./middleware.interface";
import {NextFunction, Request, Response} from "express";
import {UserService} from "../users/user.service";

export class ValidateMiddleware implements IMiddleware {
    constructor(private classToValidate: string) {}
    execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        return;
    };
}