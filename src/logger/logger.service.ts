import {ISettingsParam, Logger} from "tslog"
import {ILoggerService} from "./logger.interface";
import {injectable} from "inversify"
import 'reflect-metadata'

@injectable()
export class LoggerService implements ILoggerService{
    public logger: Logger<unknown>;

    constructor() {
        this.logger = new Logger<unknown>({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false,
        } as ISettingsParam<unknown>)
    }

    log(...args: unknown[]) {
        this.logger.info(...args);
    }

    error(...args: unknown[]) {
        this.logger.error(...args);
    }

    warn(...args: unknown[]) {
        this.logger.warn(...args);
    }
}