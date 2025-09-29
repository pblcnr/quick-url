export class DatabaseConfig {
    static getDatabaseUrl(): string {
        const url = process.env.DATABASE_URL;

        if (!url) {
            throw new Error('DATABASE_URL é obrigatório');
        }

        return url;
    }
}