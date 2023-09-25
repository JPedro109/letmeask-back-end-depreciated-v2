import { GetUsernameStub } from "./stubs";
import { NotFoundError } from "@/layers/use-cases";
import { GetUsernameController, InvalidTypeError, MissingParamError, ok, badRequest, notFound } from "@/layers/presentation";

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

		const result = await sut.http({ userId: body.id as string });

		expect(result).toEqual(badRequest(new MissingParamError("id")));
	});


	test("Should not get username, because id is with type error", async () => {
		const body = makeBody(100);
		const { sut } = makeSut();

		const result = await sut.http({ userId: body.id as string });

		expect(result).toEqual(badRequest(new InvalidTypeError("id")));
	});

	test("Should not get username, because use case returned not found error", async () => {
		const body = makeBody("2");
		const { sut, getUsernameSpy } = makeSut();
		jest.spyOn(getUsernameSpy, "execute").mockResolvedValueOnce(Promise.resolve(new NotFoundError("error")));

		const result = await sut.http({ userId: body.id as string });

		expect(result).toEqual(notFound(new NotFoundError("error")));
	});


	test("Should not get username, because use case returned error", async () => {
		const body = makeBody("1");
		const { sut, getUsernameSpy } = makeSut();
		jest.spyOn(getUsernameSpy, "execute").mockResolvedValueOnce(Promise.resolve(new Error("error")));

		const result = await sut.http({ userId: body.id as string });

		expect(result).toEqual(badRequest(new Error("error")));
	});

	test("Should get username", async () => {
		const body = makeBody("1");
		const { sut } = makeSut();

		const result = await sut.http({ userId: body.id as string });

		expect(result).toEqual(ok("username"));
	});
});