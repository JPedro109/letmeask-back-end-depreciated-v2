import { UserLoginController, MissingParamError, badRequest, ok, unauthorized, InvalidTypeError } from "@/layers/presentation";
import { UserLoginStub } from "./stubs";

const makeSut = () => {
	const userLoginStub = new UserLoginStub();
	const sut = new UserLoginController(userLoginStub);

	return {
		sut,
		userLoginStub
	};
};

const makeBody = (email: unknown, password: unknown) => {
	return {
		email,
		password
	};
};

describe("Presentation - UserLoginController", () => {
    
	test("Should not login user, because email is empty", async () => {
		const body = makeBody("", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle({ body });
        
		expect(result).toEqual(badRequest(new MissingParamError("email")));
	});

	test("Should not login user, because password is empty", async () => {
		const body = makeBody("email@test.com", "");
		const { sut } = makeSut();

		const result = await sut.handle({ body });
        
		expect(result).toEqual(badRequest(new MissingParamError("password")));
	});

	test("Should not login user, because email is with type error", async () => {
		const body = makeBody(100, "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle({ body });
        
		expect(result).toEqual(badRequest(new InvalidTypeError("email")));
	});

	test("Should not login user, because password is with type error", async () => {
		const body = makeBody("email@test.com", 100);
		const { sut } = makeSut();

		const result = await sut.handle({ body });
        
		expect(result).toEqual(badRequest(new InvalidTypeError("password")));
	});

	test("Should not login user, because use case returned error", async () => {
		const body = makeBody("email.com", "password");
		const { sut, userLoginStub } = makeSut();
		jest.spyOn(userLoginStub, "execute").mockResolvedValueOnce(Promise.resolve(new Error("error")));

		const result = await sut.handle({ body });
        
		expect(result).toEqual(unauthorized(new Error("error")));
	});

	test("Should login user", async () => {
		const body = makeBody("email@test.com", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle({ body });
        
		expect(result).toEqual(ok("code"));
	});
});