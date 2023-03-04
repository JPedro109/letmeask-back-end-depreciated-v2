import { JsonWebTokenProtocol, JsonWebTokenInvalidError, JsonWebTokenType } from "@/layers/use-cases";

export class JsonWebTokenStub implements JsonWebTokenProtocol {
	public payload: object;
	public expiryTimeInSeconds: number;
	public token: string;
	public secretKey: string;

	createToken(payload: object, expiryTimeInSeconds: number): string {
		this.payload = payload;
		this.expiryTimeInSeconds = expiryTimeInSeconds;

		return "jwt";
	}

	verifyToken(token: string): JsonWebTokenType | JsonWebTokenInvalidError {
		this.token = token;
		
		return {
			id: "1",
			email: "email@test.com"
		};
	}
}