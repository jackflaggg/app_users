import express, {Request, Response, NextFunction} from 'express'
import {userRouter} from "./users/users";

const port = 8000;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('Время ', Date.now().toString())
});

app.get('/hello', (req, res) => {
    throw new Error('Err!')
});

app.use('/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message)
    res.status(401).send(err.message)
    return;
});

app.listen(port, () => {
    console.log(
        'Server is running on port: ' + port
    )
})