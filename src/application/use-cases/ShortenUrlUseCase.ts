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
    
}