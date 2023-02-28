import { GenerationAdapter } from "@/layers/external";

describe("External - GenerationAdapter", () => {
    
	test("Should return the code | code", () => {
		const sut = new GenerationAdapter();
		jest.spyOn(sut, "code");

		const result = sut.code();

		expect(typeof result).toBe("string");
		expect(result.length).toBe(6);
		expect(sut.code).toHaveBeenCalled();
	});

	test("Should return the code expiration date | codeExpirationDate", () => {
		const timeInMinutes = 10;
		const sut = new GenerationAdapter();
		jest.spyOn(sut, "codeExpirationDate");

		const result = sut.codeExpirationDate(timeInMinutes);

		expect(typeof result).toBe("number");
		expect(sut.codeExpirationDate).toHaveBeenCalled();
		expect(sut.codeExpirationDate).toHaveBeenCalledWith(timeInMinutes);
	});
});