import { GetUsernameStub } from "./stubs";
import { GetUsernameController, HttpHelper, RequestError } from "@/layers/presentation";

const makeSut = () => {
	const getUsernameSpy = new GetUsernameStub();
	const sut = new GetUsernameController(getUsernameSpy);

	return {
		getUsernameSpy,
		sut
	};
};

const makeBody = (id: unknown) => {
	return{
		id
	};
};

describe("Presentation - GetUsernameController", () => {
    
	test("Should not get username, because id is empty", async () => {
		const body = makeBody("");
		const { sut } = makeSut();

		const result = sut.http({ userId: body.id as string });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not get username, because id is with type error", async () => {
		const body = makeBody(100);
		const { sut } = makeSut();

		const result = sut.http({ userId: body.id as string });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should get username", async () => {
		const body = makeBody("1");
		const { sut } = makeSut();

		const result = await sut.http({ userId: body.id as string });

		expect(result).toEqual(HttpHelper.ok("username"));
	});
});
