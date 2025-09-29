import amqp from 'amqplib/callback_api';

export class RabbitMQPublisher {
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

    async publishClickEvent(data: { shortCode: string, timestamp: Date }): Promise<void> {
        const message = JSON.stringify(data);
        this.channel.sendToQueue(
            'click-events',
            Buffer.from(message),
            { persistent: true }
        );
    }

    async disconnect(): Promise<void> {
        if (this.channel) this.channel.close();
        if (this.connection) this.connection.close();
    }
}