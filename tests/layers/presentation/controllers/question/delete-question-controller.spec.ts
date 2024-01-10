import { DeleteQuestionStub } from "./stubs";
import { testQuestionModel } from "./datas";
import { NotFoundError, UnauthorizedError } from "@/layers/domain";
import { DeleteQuestionController, InvalidTypeError, MissingParamError, badRequest, notFound, ok, unauthorized } from "@/layers/presentation";

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

		const response = await sut.http(
			{ 
				userId: body.userId as string, 
				data: { questionId: body.questionId } 
			});

		expect(response).toEqual(badRequest(new MissingParamError("userId")));
	});

	test("Should not delete question, because question is empty", async () => {
		const body = makeBody("1", "");
		const { sut } = makeSut();

		const response = await sut.http(
			{ 
				userId: body.userId as string, 
				data: {  questionId: body.questionId } 
			});

		expect(response).toEqual(badRequest(new MissingParamError("questionId")));
	});

	test("Should not delete question, because user id is with type error", async () => {
		const body = makeBody(100, "1");
		const { sut } = makeSut();

		const response = await sut.http(
			{ 
				userId: body.userId as string, 
				data: {  questionId: body.questionId } 
			});

		expect(response).toEqual(badRequest(new InvalidTypeError("userId")));
	});

	test("Should not delete question, because question is with type error", async () => {
		const body = makeBody("1", 100);
		const { sut } = makeSut();

		const response = await sut.http(
			{ 
				userId: body.userId as string, 
				data: {  questionId: body.questionId } 
			});

		expect(response).toEqual(badRequest(new InvalidTypeError("questionId")));
	});

	test("Should not delete question, because use case returned not found error", async () => {
		const body = makeBody("1", "2");
		const { sut, deleteQuestionStub } = makeSut();
		jest.spyOn(deleteQuestionStub, "execute").mockReturnValueOnce(Promise.resolve(new NotFoundError("error")));

		const response = await sut.http(
			{ 
				userId: body.userId as string, 
				data: {  questionId: body.questionId } 
			});

		expect(response).toEqual(notFound(new NotFoundError("error")));
	});

	test("Should not delete question, because use case returned unauthorized error", async () => {
		const body = makeBody("2", "1");
		const { sut, deleteQuestionStub } = makeSut();
		jest.spyOn(deleteQuestionStub, "execute").mockReturnValueOnce(Promise.resolve(new UnauthorizedError("error")));

		const response = await sut.http(
			{ 
				userId: body.userId as string, 
				data: {  questionId: body.questionId } 
			});

		expect(response).toEqual(unauthorized(new UnauthorizedError("error")));
	});

	test("Should not delete question, because use case returned error", async () => {
		const body = makeBody("2", "2");
		const { sut, deleteQuestionStub } = makeSut();
		jest.spyOn(deleteQuestionStub, "execute").mockReturnValueOnce(Promise.resolve(new Error("error")));

		const response = await sut.http(
			{ 
				userId: body.userId as string, 
				data: {  questionId: body.questionId } 
			});

		expect(response).toEqual(badRequest(new Error("error")));
	});

	test("Should delete question", async () => {
		const body = makeBody("1", "1");
		const { sut } = makeSut();

		const response = await sut.http(
			{ 
				userId: body.userId as string, 
				data: {  questionId: body.questionId } 
			});

		expect(response).toEqual(ok(testQuestionModel));
	});
});