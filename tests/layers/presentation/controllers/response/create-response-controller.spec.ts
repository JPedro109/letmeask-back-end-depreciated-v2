import { CreateResponseStub } from "./stubs";
import { testResponseModel } from "./datas";
import { NotFoundError, UnauthorizedError } from "@/layers/use-cases";
import { CreateResponseController, InvalidTypeError, MissingParamError, badRequest, created, notFound, unauthorized } from "@/layers/presentation";

const makeSut = () => {
	const createResponseSpy = new CreateResponseStub();
	const sut = new CreateResponseController(createResponseSpy);

	return {
		createResponseSpy, 
		sut
	};
}; 

const makeBody = (userId: unknown, questionId: unknown, response: unknown) => {
	return {
		userId,
		questionId, 
		response
	};
};

describe("Presentation - CreateResponseController", () => {
    
	test("Should not create response, because user id is empty", async () => {
		const body = makeBody("", "1", "response");
		const { sut } = makeSut();

		const response = await sut.handle(
			{ 
				userId: body.userId as string, 
				body: { questionId: body.questionId, response: body.response } 
			});

		expect(response).toEqual(badRequest(new MissingParamError("userId")));
	});

	test("Should not create response, because question id is empty", async () => {
		const body = makeBody("1", "", "response");
		const { sut } = makeSut();

		const response = await sut.handle(
			{ 
				userId: body.userId as string, 
				body: { questionId: body.questionId, response: body.response } 
			});

		expect(response).toEqual(badRequest(new MissingParamError("questionId")));
	});

	test("Should not create response, because response is empty", async () => {
		const body = makeBody("1", "1", "");
		const { sut } = makeSut();

		const response = await sut.handle(
			{ 
				userId: body.userId as string, 
				body: { questionId: body.questionId, response: body.response } 
			});

		expect(response).toEqual(badRequest(new MissingParamError("response")));
	});

	test("Should not create response, because user id is with type error", async () => {
		const body = makeBody(100, "1", "response");
		const { sut } = makeSut();

		const response = await sut.handle(
			{ 
				userId: body.userId as string, 
				body: { questionId: body.questionId, response: body.response } 
			});

		expect(response).toEqual(badRequest(new InvalidTypeError("userId")));
	});

	test("Should not create response, because question id is with type error", async () => {
		const body = makeBody("1", 100, "response");
		const { sut } = makeSut();

		const response = await sut.handle(
			{ 
				userId: body.userId as string, 
				body: { questionId: body.questionId, response: body.response } 
			});

		expect(response).toEqual(badRequest(new InvalidTypeError("questionId")));
	});

	test("Should not create response, because response is with type error", async () => {
		const body = makeBody("1", "1", 100);
		const { sut } = makeSut();

		const response = await sut.handle(
			{ 
				userId: body.userId as string, 
				body: { questionId: body.questionId, response: body.response } 
			});

		expect(response).toEqual(badRequest(new InvalidTypeError("response")));
	});

	test("Should not create response, because use case returned not found error", async () => {
		const body = makeBody("2", "2", "response");
		const { sut, createResponseSpy } = makeSut();
		jest.spyOn(createResponseSpy, "execute").mockReturnValueOnce(Promise.resolve(new NotFoundError("error")));

		const response = await sut.handle(
			{ 
				userId: body.userId as string, 
				body: { questionId: body.questionId, response: body.response } 
			});

		expect(response).toEqual(notFound(new NotFoundError("error")));
	});

	test("Should not create response, because use case returned unauthorized error", async () => {
		const body = makeBody("2", "2", "response");
		const { sut, createResponseSpy } = makeSut();
		jest.spyOn(createResponseSpy, "execute").mockReturnValueOnce(Promise.resolve(new UnauthorizedError("error")));

		const response = await sut.handle(
			{ 
				userId: body.userId as string, 
				body: { questionId: body.questionId, response: body.response } 
			});

		expect(response).toEqual(unauthorized(new UnauthorizedError("error")));
	});

	test("Should not create response, because use case returned error", async () => {
		const body = makeBody("2", "1", "response");
		const { sut, createResponseSpy } = makeSut();
		jest.spyOn(createResponseSpy, "execute").mockReturnValueOnce(Promise.resolve(new Error("error")));

		const response = await sut.handle(
			{ 
				userId: body.userId as string, 
				body: { questionId: body.questionId, response: body.response } 
			});

		expect(response).toEqual(badRequest(new Error("error")));
	});

	test("Should create response", async () => {
		const body = makeBody("1", "1", "response");
		const { sut } = makeSut();

		const response = await sut.handle(
			{ 
				userId: body.userId as string, 
				body: { questionId: body.questionId, response: body.response } 
			});

		expect(response).toEqual(created(testResponseModel));
	});
});