import {inject, injectable} from "inversify";
import {PrismaClient, UserModel } from "@prisma/client";
import {TYPES} from "../../types";
import {ILoggerService} from "../../logger/logger.interface";

@injectable()
export class PrismaService {
    client: PrismaClient
    constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
        this.client =  new PrismaClient();
    }

    async connect(): Promise<void> {
        try {
            await this.client.$connect();
            this.logger.log(`[PrismaService] Успешно подключились к базе данных!`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(`[PrismaService] ошибка подключения к базе данных: ${error.message}`);
            }
            this.logger.error(`[PrismaService] неизвестная ошибка подключения к базе данных: ${String(error)}`);
        }
    }

    async disconnect(): Promise<void> {
        await this.client.$disconnect()
    }
}