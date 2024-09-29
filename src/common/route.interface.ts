import {Request, Response, NextFunction, Router} from 'express';

export interface IControllerRoute {
    path: string;
    func: (req: Request, Response: Response, next: NextFunction) => void;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    methodTwo: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>
}