import { Question, InvalidQuestionDescriptionError } from "@/layers/entities";

describe(("Entity - Question"), () => {
    
	test("Should not create question, because question description is not valid" , () => {
		const invalidQuestionDescription = "q".repeat(300);

		const sut = Question.create(invalidQuestionDescription);

		expect(sut).toBeInstanceOf(InvalidQuestionDescriptionError);
	});

	test("Should create question" , () => {
		const questionDescription = "description";

		const sut = Question.create(questionDescription);

		expect(sut).toBeInstanceOf(Question);
	});
});