import { CreateResponseStub } from "./stubs";
import { testResponseModel } from "./datas";
import { CreateResponseController, HttpHelper, RequestError } from "@/layers/presentation";

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
		const data = makeBody("", "1", "response");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { questionId: data.questionId, response: data.response } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not create response, because question id is empty", async () => {
		const data = makeBody("1", "", "response");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { questionId: data.questionId, response: data.response } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not create response, because response is empty", async () => {
		const data = makeBody("1", "1", "");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { questionId: data.questionId, response: data.response } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not create response, because user id is with type error", async () => {
		const data = makeBody(100, "1", "response");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { questionId: data.questionId, response: data.response } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not create response, because question id is with type error", async () => {
		const data = makeBody("1", 100, "response");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { questionId: data.questionId, response: data.response } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not create response, because response is with type error", async () => {
		const data = makeBody("1", "1", 100);
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { questionId: data.questionId, response: data.response } 
			});

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should create response", async () => {
		const data = makeBody("1", "1", "response");
		const { sut } = makeSut();

		const response = sut.http(
			{ 
				userId: data.userId as string, 
				data: { questionId: data.questionId, response: data.response } 
			});

		await expect(response).resolves.toEqual(HttpHelper.created(testResponseModel));
	});
});
