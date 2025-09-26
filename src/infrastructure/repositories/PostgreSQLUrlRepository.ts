import { PrismaClient } from "../../generated/prisma/index";
import { IUrlRepository } from "../../domain/repositories/IUrlRepository";
import { Url } from "../../domain/entities/Url";

export class PostgreSQLUrlRepository implements IUrlRepository {
    private prisma = new PrismaClient();

    async save(url: Url): Promise<void> {
        await this.prisma.url.create({
            data: {
                id: url.id,
                originalUrl: url.originalUrl,
                shortCode: url.shortCode,
                createdAt: url.createdAt,
                clickCount: url.clickCount,
                isActive: url.isActive
            }
        });
    }

    async findByShortCode(code: string): Promise<Url | null> {
        const data = await this.prisma.url.findUnique({
            where: { shortCode: code }
        });

        return data ? Url.fromDatabase(data) : null;
    }

    async findById(id: string): Promise<Url | null> {
        const data = await this.prisma.url.findUnique({
            where: { id }
        });

        return data ? Url.fromDatabase(data) : null;
    }

    async updateClickCount(id: string, count: number): Promise<void> {
        await this.prisma.url.update({
            where: { id },
            data: { clickCount: count }
        });
    }
}