import {IMiddleware} from "./middleware.interface";
import {NextFunction, Request, Response} from "express";
import {UserService} from "../users/user.service";
import {ClassConstructor, plainToClass} from "class-transformer";
import {validate} from "class-validator";

export class ValidateMiddleware implements IMiddleware {
    constructor(private classToValidate: ClassConstructor<object>) {}
    execute(req: Request, res: Response, next: NextFunction): void {
        const instance = plainToClass(this.classToValidate, req.body);
        validate(instance).then((err) => {
            if (err.length) {
                res.status(422).send({errorsMessages: err})
            }
            next();
        })
    };
}