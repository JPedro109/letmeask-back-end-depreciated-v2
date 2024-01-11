import { GetUserQuestionsStub } from "./stubs";
import { testQuestionModel } from "./datas";
import { GetUserQuestionsController, HttpHelper, RequestError } from "@/layers/presentation";

const makeSut = () => {
	const sut = new GetUserQuestionsController(new GetUserQuestionsStub());

	return {
		sut
	};
};

const makeBody = (userId: unknown) => {
	return {
		userId
	};
};

describe("Presentation - GetUserQuestionsController", () => {
    
	test("Should not get users questions, because user id is empty", async () => {
		const body = makeBody("");
		const { sut } = makeSut();

		const response = sut.http({ userId: body.userId as string });

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should not get users questions, because user id is with type error", async () => {
		const body = makeBody(100);
		const { sut } = makeSut();

		const response = sut.http({ userId: body.userId as string });

		await expect(response).rejects.toThrow(RequestError);
	});

	test("Should get users questions", async () => {
		const body = makeBody("1");
		const { sut } = makeSut();

		const response = sut.http({ userId: body.userId as string });

		await expect(response).resolves.toEqual(HttpHelper.ok([testQuestionModel]));
	});
});
