import {NextFunction, Request, Response} from "express";

export interface IMiddleware {
    execute: (req: Request, Response: Response, next: NextFunction) => Promise<void>;
}