import { JsonWebTokenInvalidError } from "./error";
import { JsonWebTokenType } from "./type";

export interface AuthenticationProtocol {
	createJsonWebToken(payload: object, expiryTimeInSeconds: number): string;
	verifyJsonWebToken(token: string): JsonWebTokenType | JsonWebTokenInvalidError;
}