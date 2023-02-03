import { Response, InvalidResponseDescriptionError } from "@/layers/entities";

describe(("Entity - Response"), () => {
    
	test("Should not create response, because response description is not valid" , () => {
		const invalidResponseDescription = "r".repeat(300);

		const sut = Response.create(invalidResponseDescription);

		expect(sut).toBeInstanceOf(InvalidResponseDescriptionError);
	});

	test("Should create response" , () => {
		const responseDescription = "description";

		const sut = Response.create(responseDescription);

		expect(sut).toBeInstanceOf(Response);
	});
});