export class UrlCode {
    private static readonly VALIDATE_CODE_REGEX = /^[a-zA-Z0-9]{6}$/;
    private static readonly CODE_LENGTH = 6;
    private _value: string;

    constructor(value: string) {
        this.validate(value);
        this._value = value;
    }

    get value(): string {
        return this._value;
    }

    private validate(value: string): void {
        if (!UrlCode.VALIDATE_CODE_REGEX.test(value)) {
            throw new Error("O código é inválido");
        }
    }

    static generate(): UrlCode {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";

        for (let i = 0; i < UrlCode.CODE_LENGTH; i++) {
            let index: number = Math.floor(Math.random() * chars.length);
            let char: string = chars[index];
            result += char;
        }

        return new UrlCode(result);
    }
}