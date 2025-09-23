import { IUrlRepository } from "../../domain/repositories/IUrlRepository";
import { Url } from "../../domain/entities/Url";

export interface RedirectUrlInput {
    shortCode: string;
}

export interface RedirectUrlOutput {
    originalUrl: string;
}

export class RedirectUrlUseCase {
    constructor(
        private urlRepository: IUrlRepository
    ) {}

    async execute(input: RedirectUrlInput): Promise<RedirectUrlOutput> {
        let url: Url | null = await this.urlRepository.findByShortCode(input.shortCode);

        if (url === null) {
            throw new Error("URL não pode ser nula.");
        }

        if (!url.canRedirect()) {
            throw new Error("URL não pode ser redirecionada.");
        }

        return {
            originalUrl: url.originalUrl
        };
    }
}