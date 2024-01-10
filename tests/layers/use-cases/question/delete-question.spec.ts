import { 
	RoomRepositoryStub, 
	QuestionRepositoryStub, 
	testQuestionModel, 
	CacheStub
} from "../__mocks__";
import { DeleteQuestionUseCase, NotFoundError, UnauthorizedError } from "@/layers/domain";

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
    
	test("Should not delete question, because question is not exists", async () => {
		const userId = "1";
		const questionId = "2";
		const { sut, questionRepositoryStub } = makeSut();
		jest.spyOn(questionRepositoryStub, "getById").mockResolvedValueOnce(Promise.resolve(null));

		const result = await sut.execute({ userId, questionId });

		expect(result).toBeInstanceOf(NotFoundError);
	});

	test("Should not delete question, because the user is not room admin or question creator", async () => {
		const userId = "3";
		const questionId = "1";
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "getCodeByUserId").mockResolvedValueOnce(Promise.resolve("000001"));

		const result = await sut.execute({ userId, questionId });

		expect(result).toBeInstanceOf(UnauthorizedError);
	});

	test("Should delete question", async () => {
		const userId = "2";
		const questionId = "1";
		const { sut, questionRepositoryStub } = makeSut();
		jest.spyOn(questionRepositoryStub, "getById").mockResolvedValueOnce(Promise.resolve({ ...testQuestionModel, userId: "2" }));

		const result = await sut.execute({ userId, questionId });

		expect(result).toEqual(testQuestionModel);
	});

	test("Should delete question", async () => {
		const userId = "2";
		const questionId = "1";
		const { sut, questionRepositoryStub, roomRepositoryStub } = makeSut();
		jest
			.spyOn(questionRepositoryStub, "getById")
			.mockResolvedValueOnce(Promise.resolve({ ...testQuestionModel, roomCode: "000000" }));
		jest.spyOn(roomRepositoryStub, "getCodeByUserId").mockResolvedValueOnce(Promise.resolve("000000"));

		const result = await sut.execute({ userId, questionId });

		expect(result).toEqual(testQuestionModel);
	});
});