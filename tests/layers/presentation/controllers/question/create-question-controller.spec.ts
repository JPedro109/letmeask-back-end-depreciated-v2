import { CreateQuestionStub } from "./stubs";
import { testQuestionModel } from "./datas";
import { NotFoundError, UnauthorizedError } from "@/layers/use-cases";
import { CreateQuestionController, InvalidTypeError, MissingParamError, badRequest, created, notFound, unauthorized } from "@/layers/presentation";

const makeSut = () => {
	const createQuestionStub = new CreateQuestionStub();
	const sut = new CreateQuestionController(createQuestionStub);

	return {
		createQuestionStub,
		sut
	};
};

const makeBody = (userId: unknown, roomCode: unknown, question: unknown) => {
	return {
		userId,
		roomCode, 
		question
	};
};

describe("Presentation - CreateQuestionController", () => {
    
	test("Should not create question, because user id is empty", async () => {
		const data = makeBody("", "000000", "question");
		const { sut } = makeSut();

		const response = await sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		expect(response).toEqual(badRequest(new MissingParamError("userId")));
	});

	test("Should not create question, because room code is empty", async () => {
		const data = makeBody("1", "", "question");
		const { sut } = makeSut();

		const response = await sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		expect(response).toEqual(badRequest(new MissingParamError("roomCode")));
	});

	test("Should not create question, because question is empty", async () => {
		const data = makeBody("1", "000000", "");
		const { sut } = makeSut();

		const response = await sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		expect(response).toEqual(badRequest(new MissingParamError("question")));
	});

	test("Should not create question, because user id is with type error", async () => {
		const data = makeBody(100, "question", "question");
		const { sut } = makeSut();

		const response = await sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		expect(response).toEqual(badRequest(new InvalidTypeError("userId")));
	});

	test("Should not create question, because room code is with type error", async () => {
		const data = makeBody("1", 100, "question");
		const { sut } = makeSut();

		const response = await sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		expect(response).toEqual(badRequest(new InvalidTypeError("roomCode")));
	});

	test("Should not create question, because question is with type error", async () => {
		const data = makeBody("1", "000000", 100);
		const { sut } = makeSut();

		const response = await sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		expect(response).toEqual(badRequest(new InvalidTypeError("question")));
	});

	test("Should not create question, because use case returned not found error", async () => {
		const data = makeBody("1", "000001", "question");
		const { sut, createQuestionStub } = makeSut();
		jest.spyOn(createQuestionStub, "execute").mockReturnValueOnce(Promise.resolve(new NotFoundError("error")));

		const response = await sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		expect(response).toEqual(notFound(new NotFoundError("error")));
	});

    
	test("Should not create question, because use case returned unauthorized error", async () => {
		const data = makeBody("2", "000000", "question");
		const { sut, createQuestionStub } = makeSut();
		jest.spyOn(createQuestionStub, "execute").mockReturnValueOnce(Promise.resolve(new UnauthorizedError("error")));

		const response = await sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		expect(response).toEqual(unauthorized(new UnauthorizedError("error")));
	});

	test("Should not create question, because use case returned error", async () => {
		const data = makeBody("2", "2", "question");
		const { sut, createQuestionStub } = makeSut();
		jest.spyOn(createQuestionStub, "execute").mockReturnValueOnce(Promise.resolve(new Error("error")));

		const response = await sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		expect(response).toEqual(badRequest(new Error("error")));
	});

	test("Should create question", async () => {
		const data = makeBody("1", "1", "question");
		const { sut } = makeSut();

		const response = await sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		expect(response).toEqual(created(testQuestionModel));
	});
});