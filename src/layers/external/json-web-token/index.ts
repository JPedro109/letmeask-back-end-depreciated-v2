import { JWT_KEY } from "@/shared";
import { JsonWebTokenProtocol, JsonWebTokenType, JsonWebTokenInvalidError } from "@/layers/use-cases";

import jsonWebToken from "jsonwebtoken";

export class JsonWebTokenAdapter implements JsonWebTokenProtocol {
    
	private readonly secretKey: string = JWT_KEY;
	private readonly jsonWebToken = jsonWebToken;

	createToken(payload: object, expiryTimeInSeconds: number): string {
		return this.jsonWebToken.sign(payload, this.secretKey, { expiresIn: expiryTimeInSeconds });
	}

	verifyToken(token: string): JsonWebTokenType | JsonWebTokenInvalidError {
		try {
			return this.jsonWebToken.verify(token, this.secretKey) as JsonWebTokenType;
		} catch {
			return new JsonWebTokenInvalidError();
		}
	}
}