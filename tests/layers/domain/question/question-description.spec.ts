import { QuestionDescription, InvalidQuestionDescriptionError } from "@/layers/domain";

describe(("Object Value - QuestionDescription"), () => {
    
	test("Should not create question description, because question description is empty" , () => {
		const invalidQuestionDescription = "";

		const sut = QuestionDescription.create(invalidQuestionDescription);

		expect(sut).toBeInstanceOf(InvalidQuestionDescriptionError);
	});

	test("Should not create question description, because the question description has more than 256 characters" , () => {
		const invalidQuestionDescription = "q".repeat(300);

		const sut = QuestionDescription.create(invalidQuestionDescription);

		expect(sut).toBeInstanceOf(InvalidQuestionDescriptionError);
	});

	test("Should not create question description, because the question description has more than 256 characters" , () => {
		const questionDescription = "question-description";

		const sut = QuestionDescription.create(questionDescription);

		expect(sut).toBeInstanceOf(QuestionDescription);
	});
});