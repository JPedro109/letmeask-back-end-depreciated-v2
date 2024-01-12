import { QuestionEntity } from "@/layers/domain";

describe("Entity - QuestionEntity", () => {
    
	test("Should not create question because question description is not valid" , () => {
		const questionDescription = "";

		const sut = QuestionEntity.validate(questionDescription);

		expect(sut.invalid).toBeTruthy();
	});

	test("Should create question" , () => {
		const questionDescription = "Valid question description";

		const sut = QuestionEntity.validate(questionDescription);

		expect(sut.invalid).toBeFalsy();
	});
});
