import { ResponseValidate } from "@/layers/domain";

describe("Entity - ResponseValidate", () => {
	describe("responseDescription", () => {
		test("Should not create response description, because response description is empty", () => {
			const invalidResponseDescription = "";

			const sut = ResponseValidate.responseDescription(invalidResponseDescription);

			expect(sut.invalid).toBeTruthy();
		});

		test("Should not create response description, because response description length is greater than 256 characters", () => {
			const invalidResponseDescription = "a".repeat(300);

			const sut = ResponseValidate.responseDescription(invalidResponseDescription);

			expect(sut.invalid).toBeTruthy();
		});

		test("Should create response description", () => {
			const responseDescription = "This is a valid response description";

			const sut = ResponseValidate.responseDescription(responseDescription);

			expect(sut.invalid).toBeFalsy();
		});
	});
});
