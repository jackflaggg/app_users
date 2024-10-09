import {hash} from "bcrypt";

export class User {

    constructor(private readonly _email: string,
                private readonly _name: string,
                private _password?: string) {}

    get email(): string{
        return this._email;
    }

    get name(): string{
        return this._name;
    }

    get password(): string {
        return this._password as string;
    }

    public async setPassword(password: string, salt: number): Promise<void> {
        this._password = await hash(password, salt);
    }
}