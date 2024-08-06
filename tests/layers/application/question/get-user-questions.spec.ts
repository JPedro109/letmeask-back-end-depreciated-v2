import { QuestionRepositoryStub, testQuestionModel } from "../__mocks__";
import { GetUserQuestionsUseCase } from "@/layers/application";

const makeSut = () => {
	const questionRepositoryStub = new QuestionRepositoryStub();
	const sut = new GetUserQuestionsUseCase(questionRepositoryStub);

	return {
		questionRepositoryStub,
		sut
	};
};

describe("Use case - GetUserQuestionsUseCase", () => {
    
	test("Should get user questions", () => {
		const userId = "2";
		const { sut } = makeSut();

		const result = sut.execute({ userId });

		expect(result).resolves.toEqual([testQuestionModel]);
	});
});
