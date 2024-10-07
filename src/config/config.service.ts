import {IConfigService} from "./config.service.interface";
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv'
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {ILoggerService} from "../logger/logger.interface";

@injectable()
export class ConfigService implements IConfigService {
    private config: DotenvParseOutput | undefined;
    constructor(
        @inject(TYPES.ILoggerService) private logger: ILoggerService,
    ){
        const result: DotenvConfigOutput = config();
        if (result.error){
            this.logger.error('[ConfigService] Не удалось прочитать .env файл');
        } else {
            this.logger.log('[ConfigService] Конфигурация .env загружена')
            this.config = result.parsed as DotenvParseOutput;
        }
    }
    get<T extends number | string>(key: string): T {
        if (!this.config) {
            throw new Error('Конфигурация не инициализирована!');
        }
        return this.config[key] as T;
    }
}