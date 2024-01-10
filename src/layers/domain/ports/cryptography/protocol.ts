export interface CryptographyProtocol {
    hash(value: string): Promise<string>;
    compareHash(hash: string, valueToBeCompared: string): Promise<boolean>;
}