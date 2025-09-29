import amqp from 'amqplib/callback_api';

export class RabbitMQConsumer {
    private connection: any;
    private channel: any;

    async connect(): Promise<void> {
            return new Promise((resolve, reject) => {
                const url = process.env.RABBITMQ_URL;
    
                if (!url) {
                    reject(new Error("RABBITMQ_URL é obrigatória"));
                    return;
                }
    
                amqp.connect(url, (error, connection) => {
                    if (error) {
                        reject(error);
                        return;
                    }
    
                    this.connection = connection;
    
                    connection.createChannel((error, channel) => {
                        if (error) {
                            reject(error);
                            return;
                        }
    
                        this.channel = channel;
                        channel.assertQueue('click-events', { durable: true });
                        resolve();
                    });
                });
            });
        }

    async consumeClickEvents(callback: (message: any) => Promise<void>): Promise<void> {
        this.channel.consume('click-events', async (msg: any) => {
            const parsedMessage = JSON.parse(msg.content.toString());
            await callback(parsedMessage);
            this.channel.ack(msg)
        }, { noAck: false });
    }

    async disconnect(): Promise<void> {
        if (this.channel) this.channel.close();
        if (this.connection) this.connection.close();
    }
}