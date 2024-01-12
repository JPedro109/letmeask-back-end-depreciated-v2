import { 
	UserRepositoryStub, 
	RoomRepositoryStub, 
	QuestionRepositoryStub, 
	testUserModel, 
	testQuestionModel, 
	CacheStub
} from "../__mocks__";
import { CreateQuestionUseCase, DomainError, NotFoundError, UnauthorizedError } from "@/layers/domain";

const makeSut = () => {
	const questionRepositoryStub = new QuestionRepositoryStub();
	const roomRepositoryStub = new RoomRepositoryStub();
	const userRepositoryStub = new UserRepositoryStub();
	const cacheStub = new CacheStub();
	const sut = new CreateQuestionUseCase(questionRepositoryStub, roomRepositoryStub, userRepositoryStub, cacheStub);

	return {
		questionRepositoryStub,
		roomRepositoryStub,
		userRepositoryStub,
		sut
	};
};

describe("Use case - CreateQuestionUseCase", () => {
    
	test("Should not create question, because the question rules is not respect", () => {
		const userId = "2";
		const roomCode = "000000";
		const question = "";
		const { sut } = makeSut();

		const result = sut.execute({ userId, roomCode, question });

		expect(result).rejects.toThrow(DomainError);
	});

	test("Should not create question, the room is not exists", () => {
		const userId = "2";
		const roomCode = "000001";
		const question = "question";
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "roomExists").mockResolvedValueOnce(null);

		const result = sut.execute({ userId, roomCode, question });

		expect(result).rejects.toThrow(NotFoundError);
	});

	test("Should not create question, the action was taken by the room administrator", () => {
		const userId = "1";
		const roomCode = "000000";
		const question = "question";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce({ ...testUserModel, managedRoom: "000000" });

		const result = sut.execute({ userId, roomCode, question });

		expect(result).rejects.toThrow(UnauthorizedError);
	});

	test("Should create question", () => {
		const userId = "2";
		const roomCode = "000000";
		const question = "question";
		const { sut } = makeSut();

		const result = sut.execute({ userId, roomCode, question });

		expect(result).resolves.toEqual(testQuestionModel);
	});
});
