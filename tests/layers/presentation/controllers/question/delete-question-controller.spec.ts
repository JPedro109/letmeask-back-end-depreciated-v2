import { DeleteQuestionStub } from "./stubs";
import { testQuestionModel } from "./datas";
import { DeleteQuestionController, ok, RequestError } from "@/layers/presentation";

const makeSut = () => {
	const deleteQuestionStub = new DeleteQuestionStub();
	const sut = new DeleteQuestionController(deleteQuestionStub);

	return {
		deleteQuestionStub,
		sut
	};
};

const makeBody = (userId: unknown, questionId: unknown) => {
	return {
		userId,
		questionId
	};
};

describe("Presentation - DeleteQuestionController", () => {
    
	test("Should not delete question, because user id is empty", async () => {
		const body = makeBody("", "question");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: body.userId as string, 
				data: { questionId: body.questionId } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not delete question, because question is empty", async () => {
		const body = makeBody("1", "");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: body.userId as string, 
				data: {  questionId: body.questionId } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not delete question, because user id is with type error", async () => {
		const body = makeBody(100, "1");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: body.userId as string, 
				data: {  questionId: body.questionId } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not delete question, because question is with type error", async () => {
		const body = makeBody("1", 100);
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: body.userId as string, 
				data: {  questionId: body.questionId } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should delete question", async () => {
		const body = makeBody("1", "1");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: body.userId as string, 
				data: {  questionId: body.questionId } 
			});

		await expect(response).resolves.toEqual(ok(testQuestionModel));
	});
});
