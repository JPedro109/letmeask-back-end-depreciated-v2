import { UpdateUsernameStub } from "./stubs";
import { UpdateUsernameController, InvalidRequestError, HttpHelper } from "@/layers/presentation";

const makeSut = () => {
	const updateUsernameStub = new UpdateUsernameStub();
	const sut = new UpdateUsernameController(updateUsernameStub);

	return {
		updateUsernameStub,
		sut
	};
};

const makeBody = (id: unknown, username: unknown) => {
	return {
		id, 
		username
	};
};

describe("Presentation - UpdateUsernameController", () => {
    
	test("Should not update username, because id is empty", async () => {
		const data = makeBody("", "username");
		const { sut } = makeSut();

		const result = sut.http({ userId: data.id as string, data: { username: data.username } });

		expect(result).rejects.toThrow(InvalidRequestError);
	});

	test("Should not update username, because username is empty", async () => {
		const data = makeBody("1", "");
		const { sut } = makeSut();

		const result = sut.http({ userId: data.id as string, data: { username: data.username } });

		expect(result).rejects.toThrow(InvalidRequestError);
	});

	test("Should not update username, because id is with type error", async () => {
		const data = makeBody(100, "username");
		const { sut } = makeSut();

		const result = sut.http({ userId: data.id as string, data: { username: data.username } });

		expect(result).rejects.toThrow(InvalidRequestError);
	});

	test("Should not update username, because username is with type error", async () => {
		const data = makeBody("1", 100);
		const { sut } = makeSut();

		const result = sut.http({ userId: data.id as string, data: { username: data.username } });

		expect(result).rejects.toThrow(InvalidRequestError);
	});

	test("Should update username", async () => {
		const data = makeBody("1", "username");
		const { sut } = makeSut();

		const result = sut.http({ userId: data.id as string, data: { username: data.username } });

		await expect(result).resolves.toEqual(HttpHelper.ok(data.username));
	});
});
