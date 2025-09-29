import { randomUUID } from "crypto";

export class Url {
    private _id: string;
    private _originalUrl: string;
    private _shortCode: string;
    private _createdAt: Date;
    private _clickCount: number;
    private _isActive: boolean;

    constructor(dados: {
        originalUrl: string,
        shortCode: string,
        isActive: boolean
    }) {
        this._originalUrl = dados.originalUrl;
        this._shortCode = dados.shortCode;
        this._isActive = dados.isActive ?? true;
        this._id = randomUUID();
        this._createdAt = new Date();
        this._clickCount = 0;
    }

    get id(): string {
        return this._id;
    }

    get originalUrl(): string {
        return this._originalUrl;
    }

    get shortCode(): string {
        return this._shortCode;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get clickCount(): number {
        return this._clickCount;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    static fromDatabase(data: {
        id: string,
        originalUrl: string,
        shortCode: string,
        createdAt: Date,
        clickCount: number,
        isActive: boolean
    }) : Url {
        const url = Object.create(Url.prototype);
        url._id = data.id;
        url._originalUrl = data.originalUrl;
        url._shortCode = data.shortCode;
        url._createdAt = data.createdAt;
        url._clickCount = data.clickCount;
        url._isActive = data.isActive;
        return url;
    }

    /**
     * Verifica se a URL pode ser usada para redirecionamento
     * @returns true se a URL estiver ativa
     */
    public canRedirect(): boolean {
        return this._isActive;
    }
}