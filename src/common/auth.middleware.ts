import {IMiddleware} from "./middleware.interface";
import {NextFunction, Request, Response} from "express";
import {JwtPayload, verify} from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
    email?: string;
}
export class AuthMiddleware implements IMiddleware {
    constructor(private secret: string) {
    }
    async execute (req: Request, res: Response, next: NextFunction): Promise<void> {
        const authHeaders = req.headers.authorization;
        console.log('поступил ' + authHeaders);
        if (authHeaders){
            try {
                const [, jwt] = authHeaders.split(' ');
                console.log(jwt)
                const payload = await this.jwtVerify(jwt, this.secret);
                console.log(payload)
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
            verify(jwt, secret, (err, email) => {
                if (err) {
                    reject(err);
                }
                resolve(email as JwtPayload);
            })
        })
    }
}