import { IUrlRepository } from "../../domain/repositories/IUrlRepository";
import { Url } from "../../domain/entities/Url";
import { UrlCode } from "../../domain/value-objects/UrlCode";

export interface ShortenUrlInput {
    originalUrl: string;
}

export interface ShortenUrlOutput {
    id: string;
    shortCode: string;
    originalUrl: string;
    shortUrl: string;
}

export class ShortenUrlUseCase {
    constructor(
        private urlRepository: IUrlRepository
    ) {}

    async execute(input: ShortenUrlInput): Promise<ShortenUrlOutput> {
        if (!input.originalUrl || input.originalUrl.trim() === '') {
            throw new Error("URL original é obrigatória");
        }

        let attempts: number = 0;
        const maxAttempts: number = 10;
        let success: boolean = false;

        while (attempts < maxAttempts && !success) {
            try {
                attempts++;
                let urlCode: UrlCode = UrlCode.generate();
                let url: Url = new Url({
                    originalUrl: input.originalUrl,
                    shortCode: urlCode.value,
                    isActive: true
                })

                await this.urlRepository.save(url);
                success = true;

                return {
                    id: url.id,
                    shortCode: url.shortCode,
                    originalUrl: url.originalUrl,
                    shortUrl: `${process.env.BASE_URL}/${url.shortCode}`
                };
            } catch (errors) {
                if (attempts >= maxAttempts) {
                    throw new Error("Número de tentativas esgotadas.");
                }
            }
        }

        throw new Error("Falha ao gerar URL após múltiplas tentativas.");
    }
}