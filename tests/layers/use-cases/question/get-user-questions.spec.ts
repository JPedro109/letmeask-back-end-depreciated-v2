import { QuestionRepositoryStub, testQuestionModel } from "../__mocks__";
import { GetUserQuestionsUseCase } from "@/layers/use-cases";

const makeSut = () => {
	const questionRepositoryStub = new QuestionRepositoryStub();
	const sut = new GetUserQuestionsUseCase(questionRepositoryStub);

	return {
		questionRepositoryStub,
		sut
	};
};

describe("Use case - GetUserQuestionsUseCase", () => {
    
	test("Should get user questions", async () => {
		const userId = "2";
		const { sut } = makeSut();

		const result = await sut.execute({ userId });

		expect(result).toEqual([testQuestionModel]);
	});
});