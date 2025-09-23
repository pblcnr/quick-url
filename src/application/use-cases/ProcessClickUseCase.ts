import { IUrlRepository } from "../../domain/repositories/IUrlRepository";
import { Url } from "../../domain/entities/Url";

export interface ProcessClickInput {
    shortCode: string;
    timestamp?: Date;
}

export class ProcessClickUseCase {
    constructor(
        private urlRepository: IUrlRepository
    ) {}

    async execute(input: ProcessClickInput): Promise<void> {
        let url: Url | null = await this.urlRepository.findByShortCode(input.shortCode);

        if (url === null) {
            throw new Error("URL não pode ser nula.");
        }

        let newCount = url.clickCount + 1;

        await this.urlRepository.updateClickCount(url.id, newCount);
    }
}