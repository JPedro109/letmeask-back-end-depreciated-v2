import { ResponseEntity } from "@/layers/domain";

describe("Entity - ResponseEntity", () => {
    
	test("Should not create response because response description is not valid" , () => {
		const responseDescription = "";

		const sut = ResponseEntity.validate(responseDescription);

		expect(sut.invalid).toBeTruthy();
	});

	test("Should create response" , () => {
		const responseDescription = "Valid response description";

		const sut = ResponseEntity.validate(responseDescription);

		expect(sut.invalid).toBeFalsy();
	});
});
