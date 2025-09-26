import { IUrlRepository } from "../../domain/repositories/IUrlRepository";
import { Url } from "../../domain/entities/Url";
import { RedisUrlCache } from "../../infrastructure/cache/RedisUrlCache";

export interface RedirectUrlInput {
    shortCode: string;
}

export interface RedirectUrlOutput {
    originalUrl: string;
}

export class RedirectUrlUseCase {
    constructor(
        private urlRepository: IUrlRepository,
        private cache: RedisUrlCache
    ) {}

    async execute(input: RedirectUrlInput): Promise<RedirectUrlOutput> {
        const cachedUrl = await this.cache.get(input.shortCode);

        if (cachedUrl) {
            return { originalUrl: cachedUrl };
        }

        const url = await this.urlRepository.findByShortCode(input.shortCode);

        if (url === null) {
            throw new Error("URL não encontrada");
        }

        if (!url.canRedirect()) {
            throw new Error("URL não pode ser redirecionada.");
        }

        await this.cache.set(input.shortCode, url.originalUrl);

        return { originalUrl: url.originalUrl };
    }
}