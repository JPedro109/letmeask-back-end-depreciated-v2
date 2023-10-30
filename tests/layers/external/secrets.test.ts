import { SecretsAdapter } from "@/layers/external";
import { SecretsEnum } from "@/layers/use-cases";

describe("Infrastructure - SecretsAdapter", () => {

	test("Should get secret | getSecret", async () => {
		const variable = SecretsEnum.Port;
		process.env[variable] = "3333";
		const sut = new SecretsAdapter();
		jest.spyOn(sut, "getSecret");

		const result = sut.getSecret(variable);

		expect(result).toBe("3333");
		expect(sut.getSecret).toHaveBeenCalled();
		expect(sut.getSecret).toHaveBeenCalledWith(variable);
	});

	test("Should get secret null | getRequiredSecret", async () => {
		const variable = SecretsEnum.Port;
		delete process.env[variable];
		const sut = new SecretsAdapter();
		jest.spyOn(sut, "getSecret");

		const result = sut.getSecret(variable);

		expect(result).toBeNull();
		expect(sut.getSecret).toHaveBeenCalled();
		expect(sut.getSecret).toHaveBeenCalledWith(variable);
	});

	test("Should get error | getRequiredSecret", async () => {
		const variable = SecretsEnum.Port;
		delete process.env[variable];
		const sut = new SecretsAdapter();
		jest.spyOn(sut, "getRequiredSecret");
		let error: Error | null = null;
		
		try {
			const result = sut.getRequiredSecret(variable);
			expect(result).toBeNull();
		} catch(e) {
			error = e;
		}

		expect(error).toBeInstanceOf(Error);
		expect(sut.getRequiredSecret).toHaveBeenCalled();
		expect(sut.getRequiredSecret).toHaveBeenCalledWith(variable);
	});

	test("Should get required secret | getRequiredSecret", async () => {
		const variable = SecretsEnum.Port;
		process.env[variable] = "3333";
		const sut = new SecretsAdapter();
		jest.spyOn(sut, "getRequiredSecret");

		const result = sut.getRequiredSecret(variable);

		expect(result).toBe("3333");
		expect(sut.getRequiredSecret).toHaveBeenCalled();
		expect(sut.getRequiredSecret).toHaveBeenCalledWith(variable);
	});
});