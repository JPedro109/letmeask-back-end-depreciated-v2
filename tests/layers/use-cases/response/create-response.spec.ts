import { 
	UserRepositoryStub, 
	ResponseRepositoryStub, 
	QuestionRepositoryStub, 
	testUserModel, 
	testQuestionModel, 
	CacheStub,
	RoomRepositoryStub,
	testResponseModel
} from "../__mocks__";
import { CreateResponseUseCase, NotFoundError, ResponseModel, UnauthorizedError } from "@/layers/use-cases";

const makeSut = () => {
	const responseRepositoryStub = new ResponseRepositoryStub();
	const questionRepositoryStub = new QuestionRepositoryStub();
	const userRepositoryStub = new UserRepositoryStub();
	const roomRepositoryStub = new RoomRepositoryStub();
	const cacheStub = new CacheStub();
	const sut = new CreateResponseUseCase(responseRepositoryStub, userRepositoryStub, questionRepositoryStub, roomRepositoryStub, cacheStub);

	return {
		responseRepositoryStub, 
		questionRepositoryStub,
		userRepositoryStub,
		sut
	};
};

describe("Use case - CreateResponseUseCase", () => {
    
	test("Should not create response, because the question rules is not respect", async () => {
		const userId = "1";
		const questionId = "1";
		const response = "";
		const { sut } = makeSut();

		const result = await sut.execute({ userId, questionId, response });

		expect(result).toBeInstanceOf(Error);
	});

	test("Should not create response, because question is not exists", async () => {
		const userId = "2";
		const questionId = "3";
		const response = "response";
		const { sut, questionRepositoryStub } = makeSut();
		jest.spyOn(questionRepositoryStub, "getById").mockResolvedValueOnce(Promise.resolve(null));

		const result = await sut.execute({ userId, questionId, response });

		expect(result).toBeInstanceOf(NotFoundError);
	});
    
	test("Should not create response, because user is not room admin", async () => {
		const userId = "2";
		const questionId = "1";
		const response = "response";
		const { sut } = makeSut();

		const result = await sut.execute({ userId, questionId, response });

		expect(result).toBeInstanceOf(UnauthorizedError);
	});

	test("Should not create response, because question already has response", async () => {
		const userId = "2";
		const questionId = "2";
		const response = "response";
		const { sut, questionRepositoryStub, userRepositoryStub } = makeSut();
		jest
			.spyOn(questionRepositoryStub, "getById")
			.mockResolvedValueOnce(Promise.resolve({ 
				...testQuestionModel,
				roomCode: "000000",
				response: new ResponseModel("1", "1", "response")
			}));
		jest
			.spyOn(userRepositoryStub, "getUserById")
			.mockResolvedValueOnce(Promise.resolve({ 
				...testUserModel,
				managedRoom: "000000"
			}));

		const result = await sut.execute({ userId, questionId, response });

		expect(result).toBeInstanceOf(UnauthorizedError);
	});

	test("Should create response", async () => {
		const userId = "1";
		const questionId = "1";
		const response = "response";
		const { sut, userRepositoryStub } = makeSut();
		jest
			.spyOn(userRepositoryStub, "getUserById")
			.mockResolvedValueOnce(Promise.resolve({ ...testUserModel, managedRoom: "000000" }));

		const result = await sut.execute({ userId, questionId, response });

		expect(result).toEqual(testResponseModel);
	});
});