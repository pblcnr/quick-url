export interface ProcessClickInput {
    shortCode: string;
    timestamp?: Date;
}

export class ProcessClickUseCase {
    async execute(input: ProcessClickInput): Promise<void> {
        
    }
}