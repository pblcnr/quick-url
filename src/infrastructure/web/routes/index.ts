import { Router } from "express";
import { PostgreSQLUrlRepository } from "../../repositories/PostgreSQLUrlRepository.js";
import { RedisUrlCache } from "../../cache/RedisUrlCache.js";
import { ShortenUrlUseCase } from "../../../application/use-cases/ShortenUrlUseCase.js";
import { RedirectUrlUseCase } from "../../../application/use-cases/RedirectUrlUseCase.js";
import { UrlController } from "../controllers/UrlController.js";

const repository = new PostgreSQLUrlRepository();
const cache = new RedisUrlCache();
const shortenUseCase = new ShortenUrlUseCase(repository);
const redirectUseCase = new RedirectUrlUseCase(repository, cache);
const urlController = new UrlController(shortenUseCase, redirectUseCase);

const router = Router();

router.post('/api/urls', (req, res) => urlController.shorten(req, res));

router.get('/:shortCode', (req, res) => urlController.redirect(req, res));

export default router;