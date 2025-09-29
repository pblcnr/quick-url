import { createClient, RedisClientType } from "redis";

export class RedisUrlCache { 
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL
        });
    }

    async connect(): Promise<void> {
        await this.client.connect();
    }

    async get(shortCode: string): Promise<string | null> {
        return await this.client.get(shortCode);
    }

    async set(shortCode: string, originalUrl: string): Promise<void> {
        await this.client.set(shortCode, originalUrl, {
            EX: 3600
        });
    }

    async disconnect(): Promise<void> {
        this.client.destroy();
    }
}