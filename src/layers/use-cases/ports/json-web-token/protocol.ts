import { JsonWebTokenInvalidError } from "./error";
import { JsonWebTokenType } from "./type";

export interface JsonWebTokenProtocol {
	createToken(payload: object, expiryTimeInSeconds: number): string;
	verifyToken(token: string): JsonWebTokenType | JsonWebTokenInvalidError;
}