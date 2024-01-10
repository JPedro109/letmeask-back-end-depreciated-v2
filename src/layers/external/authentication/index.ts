import { AuthenticationProtocol, JsonWebTokenType, JsonWebTokenInvalidError, SecretsProtocol, SecretsEnum } from "@/layers/domain";

import jsonWebToken from "jsonwebtoken";

export class AuthenticationAdapter implements AuthenticationProtocol {
    
	private readonly jsonWebToken = jsonWebToken;

	constructor(private readonly secrets: SecretsProtocol) { }

	createJsonWebToken(payload: object, expiryTimeInSeconds: number): string {
		return this.jsonWebToken.sign(payload, this.secrets.getRequiredSecret(SecretsEnum.JwtKey), { expiresIn: expiryTimeInSeconds });
	}

	verifyJsonWebToken(token: string): JsonWebTokenType | JsonWebTokenInvalidError {
		try {
			return this.jsonWebToken.verify(token, this.secrets.getRequiredSecret(SecretsEnum.JwtKey)) as JsonWebTokenType;
		} catch {
			return new JsonWebTokenInvalidError();
		}
	}
}