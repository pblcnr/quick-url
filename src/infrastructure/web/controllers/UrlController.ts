import { Request, Response} from 'express';
import { ShortenUrlUseCase } from '../../../application/use-cases/ShortenUrlUseCase.js';
import { RedirectUrlUseCase } from '../../../application/use-cases/RedirectUrlUseCase.js';

export class UrlController {
    constructor(
        private shortenUrlUseCase: ShortenUrlUseCase,
        private redirectUrlUseCase: RedirectUrlUseCase
    ) {}

    async shorten(req: Request, res: Response): Promise<void> {
        try {
            const { originalUrl } = req.body;

            if (!originalUrl) {
                res.status(400).json({ error: "originalUrl é obrigatória"});
                return;
            }

            const result = await this.shortenUrlUseCase.execute({ originalUrl });

            res.status(201).json(result);

        } catch (error) {
            res.status(500).json({ error: "Erro ao encurtar URL"});
        }
    }

    async redirect(req: Request, res: Response): Promise<void> {
        try {
            const { shortCode } = req.params;

            const result = await this.redirectUrlUseCase.execute({ shortCode });

            res.redirect(result.originalUrl)
        } catch (error) {
            console.error("Erro detalhado: ", error);
            res.status(404).json({ error: "Erro ao redirecionar URL"});
        }
    }
}