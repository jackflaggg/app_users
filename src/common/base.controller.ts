import {LoggerService} from "../logger/logger.service";
import { Router, Response } from "express";
import {IControllerRoute} from "./route.interface";

export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: LoggerService) {
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

    protected bindRoutes(routes: IControllerRoute[]){
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }

}