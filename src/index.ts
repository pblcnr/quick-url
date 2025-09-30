import dotenv from 'dotenv';
dotenv.config();

import { createApp, startServer } from './infrastructure/web/server.js';
import { createRouter } from './infrastructure/web/routes/index.js';
import { RedisUrlCache } from './infrastructure/cache/RedisUrlCache.js';
import { PostgreSQLUrlRepository } from './infrastructure/repositories/PostgreSQLUrlRepository.js';
import { RabbitMQPublisher } from './infrastructure/messaging/RabbitMQPublisher.js';

async function bootstrap() {
    try {
        const repository = new PostgreSQLUrlRepository();
        const cache = new RedisUrlCache();
        const publisher = new RabbitMQPublisher();

        await cache.connect();
        await publisher.connect();

        const router = createRouter(repository, cache, publisher);
        const app = createApp(router);

        startServer(app);

        console.log("Aplicação iniciada com sucesso!");
    } catch (error) {
        console.error("Erro ao iniciar aplicação:", error);
        process.exit(1);
    }
}

bootstrap();