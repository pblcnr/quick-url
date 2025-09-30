import { IUrlRepository } from "../../domain/repositories/IUrlRepository";
import { Url } from "../../domain/entities/Url";
import { RedisUrlCache } from "../../infrastructure/cache/RedisUrlCache";
import { RabbitMQPublisher } from "../../infrastructure/messaging/RabbitMQPublisher";

export interface RedirectUrlInput {
    shortCode: string;
}

export interface RedirectUrlOutput {
    originalUrl: string;
}

export class RedirectUrlUseCase {
    constructor(
        private urlRepository: IUrlRepository,
        private cache: RedisUrlCache,
        private publisher: RabbitMQPublisher
    ) {}

    async execute(input: RedirectUrlInput): Promise<RedirectUrlOutput> {
        let originalUrl = await this.cache.get(input.shortCode);

        if (!originalUrl) {
            const url = await this.urlRepository.findByShortCode(input.shortCode);

            if (url === null) {
                throw new Error("URL não encontrada");
            }

            if (!url.canRedirect()) {
                throw new Error("URL não pode ser redirecionada");
            }

            originalUrl = url.originalUrl;

            await this.cache.set(input.shortCode, originalUrl);
        }

        await this.publisher.publishClickEvent({
            shortCode: input.shortCode,
            timestamp: new Date()
        });

        return { originalUrl };
    }
}