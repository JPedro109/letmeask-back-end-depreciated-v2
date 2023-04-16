import { JsonWebTokenAdapter } from "@/layers/external";
import { JsonWebTokenInvalidError } from "@/layers/use-cases";

describe("External - JsonWebTokenAdapter", () => {

	test("Should create the token jwt | createToken", async () => {
		const payload = {
			id: 1
		};
		const expiryTimeInSeconds = 1;
		const sut = new JsonWebTokenAdapter();
		jest.spyOn(sut, "createToken");

		const result = sut.createToken(payload, expiryTimeInSeconds);

		expect(typeof result).toBe("string");
		expect(sut.createToken).toHaveBeenCalled();
		expect(sut.createToken).toHaveBeenCalledWith(payload, expiryTimeInSeconds);
	});

	test("Should return error | verifyToken", async () => {
		const invalidToken = "invalid_token";
		const sut = new JsonWebTokenAdapter();
		jest.spyOn(sut, "verifyToken");

		const result = sut.verifyToken(invalidToken);

		expect(result).toBeInstanceOf(JsonWebTokenInvalidError);
		expect(sut.verifyToken).toHaveBeenCalled();
		expect(sut.verifyToken).toHaveBeenCalledWith(invalidToken);
	});

	test("Should verify the token jwt | verifyToken", async () => {
		const sut = new JsonWebTokenAdapter();
		const payload = { id: 1 };
		const token = sut.createToken(payload, 1);
		jest.spyOn(sut, "verifyToken");

		const result = sut.verifyToken(token);

		expect(result).not.toBeInstanceOf(JsonWebTokenInvalidError);
		expect(sut.verifyToken).toHaveBeenCalled();
		expect(sut.verifyToken).toHaveBeenCalledWith(token);
	});
});