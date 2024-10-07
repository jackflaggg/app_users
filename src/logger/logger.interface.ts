import {Logger} from "tslog";

export interface ILoggerService {
    logger: Logger<unknown>;
    log: (...args: unknown[]) => void
    error: (...args: unknown[]) => void
    warn: (...args: unknown[]) => void
}