import { 
	UserRepositoryStub, 
	RoomRepositoryStub, 
	QuestionRepositoryStub, 
	testUserModel, 
	testQuestionModel, 
	CacheStub
} from "../__mocks__";
import { CreateQuestionUseCase, NotFoundError, UnauthorizedError } from "@/layers/use-cases";

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
    
	test("Should not create question, because the question rules is not respect", async () => {
		const userId = "2";
		const roomCode = "000000";
		const question = "";
		const { sut } = makeSut();

		const result = await sut.execute({ userId, roomCode, question });

		expect(result).toBeInstanceOf(Error);
	});

	test("Should not create question, the room is not exists", async () => {
		const userId = "2";
		const roomCode = "000001";
		const question = "question";
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "roomExists").mockResolvedValueOnce(Promise.resolve(null));

		const result = await sut.execute({ userId, roomCode, question });

		expect(result).toBeInstanceOf(NotFoundError);
	});

	test("Should not create question, the action was taken by the room administrator", async () => {
		const userId = "1";
		const roomCode = "000000";
		const question = "question";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(Promise.resolve({ ...testUserModel, managedRoom: "000000" }));

		const result = await sut.execute({ userId, roomCode, question });

		expect(result).toBeInstanceOf(UnauthorizedError);
	});

	test("Should create question", async () => {
		const userId = "2";
		const roomCode = "000000";
		const question = "question";
		const { sut } = makeSut();

		const result = await sut.execute({ userId, roomCode, question });

		expect(result).toEqual(testQuestionModel);
	});
});