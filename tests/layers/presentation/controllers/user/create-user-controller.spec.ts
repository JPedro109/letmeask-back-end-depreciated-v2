import { CreateUserController, created, RequestError } from "@/layers/presentation";
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

		const result = sut.http({ data });
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not create user, because username is empty", async () => {
		const data = makeBody("email@test.com", "", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ data });
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not create user, because password is empty", async () => {
		const data = makeBody("email@test.com", "username", "", "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ data });
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not create user, because passwordConfirm is empty", async () => {
		const data = makeBody("email@test.com", "username", "Password1234", "");
		const { sut } = makeSut();

		const result = sut.http({ data });
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not create user, because email is with type error", async () => {
		const data = makeBody(100, "username", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ data });
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not create user, because username is with type error", async () => {
		const data = makeBody("email@test.com", 100, "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ data });
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not create user, because password is with type error", async () => {
		const data = makeBody("email@test.com", "username", 100, "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ data });
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not create user, because passwordConfirm is with type error", async () => {
		const data = makeBody("email@test.com", "username", "Password1234", 100);
		const { sut } = makeSut();

		const result = sut.http({ data });
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should create user", async () => {
		const data = makeBody("email@test.com", "username", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.http({ data });
        
		expect(result).toEqual(created(data.email));
	});
});
