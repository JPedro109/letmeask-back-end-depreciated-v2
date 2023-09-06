import { RecoverUserPasswordController, MissingParamError, badRequest, ok, notFound, InvalidTypeError } from "@/layers/presentation";
import { RecoverUserPasswordStub } from "./stubs";
import { InvalidParamError, NotFoundError } from "@/layers/use-cases";

const makeSut = () => {
	const recoverUserPasswordStub = new RecoverUserPasswordStub();
	const sut = new RecoverUserPasswordController(recoverUserPasswordStub);

	return {
		sut,
		recoverUserPasswordStub
	};
};

const makeBody = (email: unknown, code: unknown, password: unknown, passwordConfirm: unknown) => {
	return {
		email,
		code,
		password,
		passwordConfirm
	};
};

describe("Presentation - RecoverUserPasswordController", () => {
    
	test("Should not recover user password, because email is empty", async () => {
		const data = makeBody("", "code", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).toEqual(badRequest(new MissingParamError("email")));
	});

	test("Should not recover user password, because code is empty", async () => {
		const data = makeBody("email@test.com", "", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).toEqual(badRequest(new MissingParamError("code")));
	});

	test("Should not recover user password, because password is empty", async () => {
		const data = makeBody("email@test.com", "code", "", "Password1234");
		const { sut } = makeSut();

		const result = await sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).toEqual(badRequest(new MissingParamError("password")));
	});

	test("Should not recover user password, because password confirm is empty", async () => {
		const data = makeBody("email@test.com", "code", "Password1234", "");
		const { sut } = makeSut();

		const result = await sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).toEqual(badRequest(new MissingParamError("passwordConfirm")));
	});

	test("Should not recover user password, because email is with type error", async () => {
		const data = makeBody(100, "code", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).toEqual(badRequest(new InvalidTypeError("email")));
	});

	test("Should not recover user password, because code is with type error", async () => {
		const data = makeBody("email@test.com", 100, "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).toEqual(badRequest(new InvalidTypeError("code")));
	});

	test("Should not recover user password, because password is with type error", async () => {
		const data = makeBody("email@test.com", "code", 100, "Password1234");
		const { sut } = makeSut();

		const result = await sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).toEqual(badRequest(new InvalidTypeError("password")));
	});

	test("Should not recover user password, because password confirm is with type error", async () => {
		const data = makeBody("email@test.com", "code", "Password1234", 100);
		const { sut } = makeSut();

		const result = await sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).toEqual(badRequest(new InvalidTypeError("passwordConfirm")));
	});

	test("Should not recover user password, because use case returned invalid param error", async () => {
		const data = makeBody("email@test.com", "token_invalid", "password", "password");
		const { sut, recoverUserPasswordStub } = makeSut();
		jest.spyOn(recoverUserPasswordStub, "execute").mockResolvedValueOnce(Promise.resolve(new InvalidParamError("error")));

		const result = await sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).toEqual(badRequest(new InvalidParamError("error")));
	});

	test("Should not recover user password, because use case returned not found error", async () => {
		const data = makeBody("email.com", "token_invalid", "password", "password");
		const { sut, recoverUserPasswordStub } = makeSut();
		jest.spyOn(recoverUserPasswordStub, "execute").mockResolvedValueOnce(Promise.resolve(new NotFoundError("error")));

		const result = await sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).toEqual(notFound(new NotFoundError("error")));
	});

	test("Should recover user password", async () => {
		const data = makeBody("email@test.com", "code", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).toEqual(ok(data.email));
	});

});