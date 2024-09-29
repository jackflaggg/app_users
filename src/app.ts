import express, {Express} from 'express'
import {userRouter} from "./users/users";
import {Server} from "http";

export class App {
    private app: Express;
    private server: Server
    private port: number;

    constructor(app: Express = express(), port: number = 8000) {
        this.app = app;
        this.port = port;
    }

    useRoutes() {
        this.app.use('/users', userRouter)
    }
    public async init() {
        this.useRoutes();

    }
}