import { Router, Response } from "express";
import {IControllerRoute} from "./route.interface";
import {injectable} from "inversify";
import 'reflect-metadata'
import {ILoggerService} from "../logger/logger.interface";

@injectable()
export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: ILoggerService) {
        this._router = Router();
    }

    public get router() {
        return this._router;
    }

    public ok<T>(res: Response, msg: T){
        return this.send<T>(res,200, msg)
    }

    public created(res: Response) {
        return res
            .sendStatus(201);
    }

    public send<T>(res: Response, code: number, msg: T) {
        return res
            .status(code)
            .json(msg);
    }

    // связывает маршруты с соответствующими обработчиками,
    // используя bind(this) для сохранения контекста
    protected bindRoutes(routes: IControllerRoute[]){
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const middleware = route.middlewares?.map(elem => elem.execute.bind(elem));
            const handler = route.func.bind(this);
            const pipeline = middleware ? [...middleware, handler] : handler;
            this.router[route.method](route.path, pipeline);
        }
    }

}