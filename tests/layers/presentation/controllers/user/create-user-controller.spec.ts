import { CreateUserController, MissingParamError, InvalidTypeError, badRequest, created } from "@/layers/presentation";
import { CreateUserStub } from "./stubs";

const makeSut = () => {
	const createUserStub = new CreateUserStub();
	const sut = new CreateUserController(createUserStub);

	return {
		sut,
		createUserStub
	};
};

const makeBody = (email: unknown, username: unknown, password: unknown, passwordConfirm: unknown) => {
	return {
		email,
		username,
		password,
		passwordConfirm
	};
};

describe("Presentation - CreateUserController", () => {
    

	test("Should not create user, because email is empty", async () => {
		const data = makeBody("", "username", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle({ data });
        
		expect(result).toEqual(badRequest(new MissingParamError("email")));
	});

	test("Should not create user, because username is empty", async () => {
		const data = makeBody("email@test.com", "", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle({ data });
        
		expect(result).toEqual(badRequest(new MissingParamError("username")));
	});

	test("Should not create user, because password is empty", async () => {
		const data = makeBody("email@test.com", "username", "", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle({ data });
        
		expect(result).toEqual(badRequest(new MissingParamError("password")));
	});

	test("Should not create user, because passwordConfirm is empty", async () => {
		const data = makeBody("email@test.com", "username", "Password1234", "");
		const { sut } = makeSut();

		const result = await sut.handle({ data });
        
		expect(result).toEqual(badRequest(new MissingParamError("passwordConfirm")));
	});

	test("Should not create user, because email is with type error", async () => {
		const data = makeBody(100, "username", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle({ data });
        
		expect(result).toEqual(badRequest(new InvalidTypeError("email")));
	});

	test("Should not create user, because username is with type error", async () => {
		const data = makeBody("email@test.com", 100, "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle({ data });
        
		expect(result).toEqual(badRequest(new InvalidTypeError("username")));
	});

	test("Should not create user, because password is with type error", async () => {
		const data = makeBody("email@test.com", "username", 100, "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle({ data });
        
		expect(result).toEqual(badRequest(new InvalidTypeError("password")));
	});

	test("Should not create user, because passwordConfirm is with type error", async () => {
		const data = makeBody("email@test.com", "username", "Password1234", 100);
		const { sut } = makeSut();

		const result = await sut.handle({ data });
        
		expect(result).toEqual(badRequest(new InvalidTypeError("passwordConfirm")));
	});

	test("Should not create user, because use case returned error", async () => {
		const data = makeBody("email.com", "username", "password", "password");
		const { sut, createUserStub } = makeSut();
		jest.spyOn(createUserStub, "execute").mockReturnValueOnce(Promise.resolve(new Error("error")));

		const result = await sut.handle({ data });
        
		expect(result).toEqual(badRequest(new Error("error")));
	});

	test("Should create user", async () => {
		const data = makeBody("email@test.com", "username", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle({ data });
        
		expect(result).toEqual(created(data.email));
	});
});