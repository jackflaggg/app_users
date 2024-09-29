import express, {Express} from 'express'
import {userRouter} from "./users/users";

export class App {
    private app: Express;
    private port: number;

    constructor(app: Express = express(), port: number = 8000) {
        this.app = app;
        this.port = port;
    }

    useRoutes() {
        this.app.use('/users', userRouter)
    }
    public async init() {

    }
}