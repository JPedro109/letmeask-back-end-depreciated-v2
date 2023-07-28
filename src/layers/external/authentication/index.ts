import { JWT_KEY } from "@/shared";
import { AuthenticationProtocol, JsonWebTokenType, JsonWebTokenInvalidError } from "@/layers/use-cases";

import jsonWebToken from "jsonwebtoken";

export class AuthenticationAdapter implements AuthenticationProtocol {
    
	private readonly secretKey: string = JWT_KEY;
	private readonly jsonWebToken = jsonWebToken;

	createJsonWebToken(payload: object, expiryTimeInSeconds: number): string {
		return this.jsonWebToken.sign(payload, this.secretKey, { expiresIn: expiryTimeInSeconds });
	}

	verifyJsonWebToken(token: string): JsonWebTokenType | JsonWebTokenInvalidError {
		try {
			return this.jsonWebToken.verify(token, this.secretKey) as JsonWebTokenType;
		} catch {
			return new JsonWebTokenInvalidError();
		}
	}
}