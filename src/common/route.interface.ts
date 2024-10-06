import {Request, Response, NextFunction, Router} from 'express';
import {IMiddleware} from "./middleware.interface";

export interface IControllerRoute {
    path: string;
    func: (req: Request, Response: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
    middlewares?: IMiddleware[]
}

export type ExpressReturnType = Response<any, Record<string, any>>