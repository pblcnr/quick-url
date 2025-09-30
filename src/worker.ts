import dotenv from 'dotenv';
dotenv.config();

import { RabbitMQConsumer } from './infrastructure/messaging/RabbitMQConsumer.js';
import { PostgreSQLUrlRepository } from './infrastructure/repositories/PostgreSQLUrlRepository.js';
import { ProcessClickUseCase } from './application/use-cases/ProcessClickUseCase.js';

async function startWorker() {
    try {
        const repository = new PostgreSQLUrlRepository();
        const consumer = new RabbitMQConsumer();
        const processClickUseCase = new ProcessClickUseCase(repository);

        await consumer.connect();

        await consumer.consumeClickEvents(async (message) => {
            try {
                const { shortCode, timestamp } = message;

                await processClickUseCase.execute({ shortCode, timestamp });

                console.log(`Click processado: ${shortCode}`);
            } catch (error) {
                console.error("Erro ao processar click:", error);
            }
        });

        console.log("Worker iniciado - aguardando mensagens...");
    } catch (error) {
        console.error('Erro ao iniciar worker:', error);
        process.exit(1);
    }
}

startWorker();