import { UpdateUsernameStub } from "./stubs";
import { NotFoundError } from "@/layers/domain";
import { UpdateUsernameController, InvalidTypeError, MissingParamError, ok, badRequest, notFound } from "@/layers/presentation";

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

		const result = await sut.http({ userId: data.id as string, data: { username: data.username } });

		expect(result).toEqual(badRequest(new MissingParamError("id")));
	});

	test("Should not update username, because username is empty", async () => {
		const data = makeBody("1", "");
		const { sut } = makeSut();

		const result = await sut.http({ userId: data.id as string, data: { username: data.username } });

		expect(result).toEqual(badRequest(new MissingParamError("username")));
	});

	test("Should not update username, because id is with type error", async () => {
		const data = makeBody(100, "username");
		const { sut } = makeSut();

		const result = await sut.http({ userId: data.id as string, data: { username: data.username } });

		expect(result).toEqual(badRequest(new InvalidTypeError("id")));
	});

	test("Should not update username, because username is with type error", async () => {
		const data = makeBody("1", 100);
		const { sut } = makeSut();

		const result = await sut.http({ userId: data.id as string, data: { username: data.username } });

		expect(result).toEqual(badRequest(new InvalidTypeError("username")));
	});

	test("Should not update username, because use case returned not found error", async () => {
		const data = makeBody("1", "username");
		const { sut, updateUsernameStub } = makeSut();
		jest.spyOn(updateUsernameStub, "execute").mockResolvedValueOnce(Promise.resolve(new NotFoundError("error")));

		const result = await sut.http({ userId: data.id as string, data: { username: data.username } });

		expect(result).toEqual(notFound(new NotFoundError("error")));
	});


	test("Should not update username, because use case returned error", async () => {
		const data = makeBody("1", "username");
		const { sut, updateUsernameStub } = makeSut();
		jest.spyOn(updateUsernameStub, "execute").mockResolvedValueOnce(Promise.resolve(new Error("error")));

		const result = await sut.http({ userId: data.id as string, data: { username: data.username } });

		expect(result).toEqual(badRequest(new Error("error")));
	});

	test("Should update username", async () => {
		const data = makeBody("1", "username");
		const { sut } = makeSut();

		const result = await sut.http({ userId: data.id as string, data: { username: data.username } });

		expect(result).toEqual(ok(data.username));
	});
});