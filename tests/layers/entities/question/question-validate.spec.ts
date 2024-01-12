import { QuestionValidate } from "@/layers/domain";

describe("Entity - QuestionValidate", () => {
	describe("questionDescription", () => {
		test("Should not create question description, because question description is empty", () => {
			const invalidQuestionDescription = "";

			const sut = QuestionValidate.questionDescription(invalidQuestionDescription);

			expect(sut.invalid).toBeTruthy();
		});

		test("Should not create question description, because question description length is greater than 256 characters", () => {
			const invalidQuestionDescription = "a".repeat(300);

			const sut = QuestionValidate.questionDescription(invalidQuestionDescription);

			expect(sut.invalid).toBeTruthy();
		});

		test("Should create question description", () => {
			const questionDescription = "This is a valid question description";

			const sut = QuestionValidate.questionDescription(questionDescription);

			expect(sut.invalid).toBeFalsy();
		});
	});
});
