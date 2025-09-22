import { Url } from "../entities/Url";

export interface IUrlRepository {
    save(url: Url): Promise<void>;
    findByShortCode(code: string): Promise<Url | null>;
    findById(id: string): Promise<Url | null>;
    updateClickCount(id: string, count: number): Promise<void>;
}