import { ResponseEntity, DomainError, InvalidResponseDescriptionError } from "@/layers/domain";

describe(("Entity - Response"), () => {
    
	test("Should not create response, because response description is not valid" , () => {
		const invalidResponseDescription = "r".repeat(300);

		const sut = () => ResponseEntity.create({
			responseDescription: invalidResponseDescription
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should create response" , () => {
		const responseDescription = "description";

		const sut = ResponseEntity.create({
			responseDescription
		});

		expect(sut).toBeInstanceOf(ResponseEntity);
	});

	test("Should not update response, because response description is incorrect" , () => {
		const responseDescription = "description";
		const response = ResponseEntity.create({
			responseDescription
		});

		const sut = () => response.responseDescription = "";

		expect(sut).toThrow(InvalidResponseDescriptionError);
	});

	test("Should update response" , () => {
		const responseDescription = "description";
		const response = ResponseEntity.create({
			responseDescription
		});

		response.responseDescription = "description two";

		expect(response.responseDescription).toBe("description two");
	});
});