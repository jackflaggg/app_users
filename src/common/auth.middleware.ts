import {IMiddleware} from "./middleware.interface";
import {NextFunction, Request, Response} from "express";
import {JwtPayload, verify} from "jsonwebtoken";

export class AuthMiddleware implements IMiddleware {
    constructor(private secret: string) {
    }
    async execute (req: Request, res: Response, next: NextFunction): Promise<void> {
        const authHeaders = req.headers.authorization;
        if (authHeaders){
            try {
                const [, jwt] = authHeaders.split(' ');
                const payload = await this.jwtVerify(jwt, this.secret);
                req.user = payload.email;
                next()
            } catch (e: unknown){
                next()
            }
        }
        next();
    };
    private async jwtVerify(jwt: string, secret: string): Promise<JwtPayload> {
        return new Promise((resolve, reject) => {
            verify(jwt, secret, (err, payload) => {
                if (err) {
                    reject(err);
                }
                resolve(payload as JwtPayload);
            })
        })
    }
}