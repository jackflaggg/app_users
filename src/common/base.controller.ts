import {LoggerService} from "../logger/logger.service";
import { Router } from "express";

export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: LoggerService) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

}