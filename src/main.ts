import {App} from "./app";

export async function bootstrap(){
    const app = new App();
    await app.init();
}

bootstrap();