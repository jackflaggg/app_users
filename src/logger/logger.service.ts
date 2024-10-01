import {ISettingsParam, Logger} from "tslog"
import {ILogger} from "./logger.interface";

export class LoggerService implements ILogger{
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