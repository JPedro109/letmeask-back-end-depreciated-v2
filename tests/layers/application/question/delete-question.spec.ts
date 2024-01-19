import { 
	RoomRepositoryStub, 
	QuestionRepositoryStub, 
	testQuestionModel, 
	CacheStub
} from "../__mocks__";
import { DeleteQuestionUseCase, NotFoundError, UnauthorizedError } from "@/layers/application";

const makeSut = () => {
	const questionRepositoryStub = new QuestionRepositoryStub();
	const roomRepositoryStub = new RoomRepositoryStub();
	const cacheStub = new CacheStub();
	const sut = new DeleteQuestionUseCase(questionRepositoryStub, roomRepositoryStub, cacheStub);

	return {
		questionRepositoryStub,
		roomRepositoryStub,
		sut
	};
};

describe("Use case - DeleteQuestionUseCase", () => {
    
	test("Should not delete question, because question is not exists", () => {
		const userId = "1";
		const questionId = "2";
		const { sut, questionRepositoryStub } = makeSut();
		jest.spyOn(questionRepositoryStub, "getQuestionById").mockResolvedValueOnce(null);

		const result = sut.execute({ userId, questionId });

		expect(result).rejects.toThrow(NotFoundError);
	});

	test("Should not delete question, because the user is not room admin or question creator", () => {
		const userId = "3";
		const questionId = "1";
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "getRoomCodeByUserId").mockResolvedValueOnce("000001");

		const result = sut.execute({ userId, questionId });

		expect(result).rejects.toThrow(UnauthorizedError);
	});

	test("Should delete question", () => {
		const userId = "2";
		const questionId = "1";
		const { sut, questionRepositoryStub } = makeSut();
		jest.spyOn(questionRepositoryStub, "getQuestionById").mockResolvedValueOnce({ ...testQuestionModel, userId: "2" });

		const result = sut.execute({ userId, questionId });

		expect(result).resolves.toEqual(testQuestionModel);
	});

	test("Should delete question", () => {
		const userId = "2";
		const questionId = "1";
		const { sut, questionRepositoryStub, roomRepositoryStub } = makeSut();
		jest
			.spyOn(questionRepositoryStub, "getQuestionById")
			.mockResolvedValueOnce({ ...testQuestionModel, roomCode: "000000" });
		jest.spyOn(roomRepositoryStub, "getRoomCodeByUserId").mockResolvedValueOnce("000000");

		const result = sut.execute({ userId, questionId });

		expect(result).resolves.toEqual(testQuestionModel);
	});
});
