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
import { DomainError } from "@/layers/domain";
import { CreateResponseUseCase, NotFoundError, ResponseModel, UnauthorizedError } from "@/layers/application";

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
    
	test("Should not create response, because the question rules is not respect", () => {
		const userId = "1";
		const questionId = "1";
		const response = "";
		const { sut } = makeSut();

		const result = sut.execute({ userId, questionId, response });

		expect(result).rejects.toThrow(DomainError);
	});

	test("Should not create response, because question is not exists", () => {
		const userId = "2";
		const questionId = "3";
		const response = "response";
		const { sut, questionRepositoryStub } = makeSut();
		jest.spyOn(questionRepositoryStub, "getById").mockResolvedValueOnce(null);

		const result = sut.execute({ userId, questionId, response });

		expect(result).rejects.toThrow(NotFoundError);
	});
    
	test("Should not create response, because user is not room admin", () => {
		const userId = "2";
		const questionId = "1";
		const response = "response";
		const { sut } = makeSut();

		const result = sut.execute({ userId, questionId, response });

		expect(result).rejects.toThrow(UnauthorizedError);
	});

	test("Should not create response, because question already has response", () => {
		const userId = "2";
		const questionId = "2";
		const response = "response";
		const { sut, questionRepositoryStub, userRepositoryStub } = makeSut();
		jest
			.spyOn(questionRepositoryStub, "getById")
			.mockResolvedValueOnce({ 
				...testQuestionModel,
				roomCode: "000000",
				response: new ResponseModel("1", "1", "response")
			});
		jest
			.spyOn(userRepositoryStub, "getUserById")
			.mockResolvedValueOnce({ 
				...testUserModel,
				managedRoom: "000000"
			});

		const result = sut.execute({ userId, questionId, response });

		expect(result).rejects.toThrow(UnauthorizedError);
	});

	test("Should create response", () => {
		const userId = "1";
		const questionId = "1";
		const response = "response";
		const { sut, userRepositoryStub } = makeSut();
		jest
			.spyOn(userRepositoryStub, "getUserById")
			.mockResolvedValueOnce({ ...testUserModel, managedRoom: "000000" });

		const result = sut.execute({ userId, questionId, response });

		expect(result).resolves.toEqual(testResponseModel);
	});
});
