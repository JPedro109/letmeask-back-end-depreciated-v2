import { AuthenticationProtocol, JsonWebTokenInvalidError, JsonWebTokenType } from "@/layers/use-cases";

export class JsonWebTokenStub implements AuthenticationProtocol {
	public payload: object;
	public expiryTimeInSeconds: number;
	public token: string;
	public secretKey: string;

	createJsonWebToken(payload: object, expiryTimeInSeconds: number): string {
		this.payload = payload;
		this.expiryTimeInSeconds = expiryTimeInSeconds;

		return "jwt";
	}

	verifyJsonWebToken(token: string): JsonWebTokenType | JsonWebTokenInvalidError {
		this.token = token;
		
		return {
			id: "1",
			email: "email@test.com"
		};
	}
}