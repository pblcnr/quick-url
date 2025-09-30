import { Router } from "express";
import { RedisUrlCache } from "../../cache/RedisUrlCache.js";
import { ShortenUrlUseCase } from "../../../application/use-cases/ShortenUrlUseCase.js";
import { RedirectUrlUseCase } from "../../../application/use-cases/RedirectUrlUseCase.js";
import { UrlController } from "../controllers/UrlController.js";
import { IUrlRepository } from "../../../domain/repositories/IUrlRepository.js";
import { RabbitMQPublisher } from "../../messaging/RabbitMQPublisher.js";

export function createRouter(
    repository: IUrlRepository,
    cache: RedisUrlCache,
    publisher: RabbitMQPublisher
): Router {
    const shortenUseCase = new ShortenUrlUseCase(repository);
    const redirectUseCase = new RedirectUrlUseCase(repository, cache, publisher);
    const urlController = new UrlController(shortenUseCase, redirectUseCase);

    const router = Router();

    router.post('/api/urls', (req, res) => urlController.shorten(req, res));
    router.get('/:shortCode', (req, res) => urlController.redirect(req, res));

    return router;
}