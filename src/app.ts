import express, {Express} from 'express'
import {userRouter} from "./users/users";
import {Server} from "http";

export class App {
    private app: Express;
    private server: Server | undefined;
    public port: number;

    constructor(app: Express = express(), port: number = 8000) {
        this.app = app;
        this.port = port;
    }

    useRoutes() {
        this.app.use('/users', userRouter)
    }
    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port, () => {
            console.log('Server is running on port: ' + this.port)
        });

    }
}

