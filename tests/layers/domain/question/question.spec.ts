import { QuestionEntity, DomainError } from "@/layers/domain";

describe(("Entity - Question"), () => {
    
	test("Should not create question, because question description is not valid" , () => {
		const invalidQuestionDescription = "q".repeat(300);

		const sut = () => QuestionEntity.create({
			questionDescription: invalidQuestionDescription
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should create question" , () => {
		const questionDescription = "description";

		const sut = QuestionEntity.create({
			questionDescription
		});

		expect(sut).toBeInstanceOf(QuestionEntity);
	});
});