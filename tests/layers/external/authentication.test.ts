import { AuthenticationAdapter, SecretsAdapter } from "@/layers/external";
import { JsonWebTokenInvalidError } from "@/layers/use-cases";

describe("External - AuthenticationAdapter", () => {

	const secretsAdapter = new SecretsAdapter();

	test("Should create the token jwt | createJsonWebToken", async () => {
		const payload = {
			id: 1
		};
		const expiryTimeInSeconds = 1;
		const sut = new AuthenticationAdapter(secretsAdapter);
		jest.spyOn(sut, "createJsonWebToken");

		const result = sut.createJsonWebToken(payload, expiryTimeInSeconds);

		expect(typeof result).toBe("string");
		expect(sut.createJsonWebToken).toHaveBeenCalled();
		expect(sut.createJsonWebToken).toHaveBeenCalledWith(payload, expiryTimeInSeconds);
	});

	test("Should return error | verifyJsonWebToken", async () => {
		const invalidToken = "invalid_token";
		const sut = new AuthenticationAdapter(secretsAdapter);
		jest.spyOn(sut, "verifyJsonWebToken");

		const result = sut.verifyJsonWebToken(invalidToken);

		expect(result).toBeInstanceOf(JsonWebTokenInvalidError);
		expect(sut.verifyJsonWebToken).toHaveBeenCalled();
		expect(sut.verifyJsonWebToken).toHaveBeenCalledWith(invalidToken);
	});

	test("Should verify the token jwt | verifyJsonWebToken", async () => {
		const sut = new AuthenticationAdapter(secretsAdapter);
		const payload = { id: 1 };
		const token = sut.createJsonWebToken(payload, 1);
		jest.spyOn(sut, "verifyJsonWebToken");

		const result = sut.verifyJsonWebToken(token);

		expect(result).not.toBeInstanceOf(JsonWebTokenInvalidError);
		expect(sut.verifyJsonWebToken).toHaveBeenCalled();
		expect(sut.verifyJsonWebToken).toHaveBeenCalledWith(token);
	});
});