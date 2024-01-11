import { CreateQuestionStub } from "./stubs";
import { testQuestionModel } from "./datas";
import { CreateQuestionController, created, RequestError } from "@/layers/presentation";

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

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not create question, because room code is empty", async () => {
		const data = makeBody("1", "", "question");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not create question, because question is empty", async () => {
		const data = makeBody("1", "000000", "");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not create question, because user id is with type error", async () => {
		const data = makeBody(100, "question", "question");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not create question, because room code is with type error", async () => {
		const data = makeBody("1", 100, "question");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not create question, because question is with type error", async () => {
		const data = makeBody("1", "000000", 100);
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should create question", async () => {
		const data = makeBody("1", "1", "question");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { roomCode: data.roomCode, question: data.question } 
			});

		await expect(response).resolves.toEqual(created(testQuestionModel));
	});
});
