export class HTTPError extends Error {
    constructor(statusCode: number, message: string, context?: string) {
        super(message);
    }
}