import { ResponseDescription, InvalidResponseDescriptionError } from "@/layers/domain";

describe(("Object Value - ResponseDescription"), () => {
    
	test("Should not create response description, because response description is empty" , () => {
		const invalidResponseDescription = "";

		const sut = ResponseDescription.create(invalidResponseDescription);

		expect(sut).toBeInstanceOf(InvalidResponseDescriptionError);
	});

	test("Should not create response description, because the response description has more than 256 characters" , () => {
		const invalidResponseDescription = "r".repeat(300);

		const sut = ResponseDescription.create(invalidResponseDescription);

		expect(sut).toBeInstanceOf(InvalidResponseDescriptionError);
	});

	test("Should not create response description, because the response description has more than 256 characters" , () => {
		const responseDescription = "response-description";

		const sut = ResponseDescription.create(responseDescription);

		if(!(sut instanceof Error)) expect(sut.value).toBe(responseDescription);
		expect(sut).toBeInstanceOf(ResponseDescription);
	});
});