import { HttpHelper, RecoverUserPasswordController, RequestError } from "@/layers/presentation";
import { RecoverUserPasswordStub } from "./stubs";

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

		const result = sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not recover user password, because code is empty", async () => {
		const data = makeBody("email@test.com", "", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not recover user password, because password is empty", async () => {
		const data = makeBody("email@test.com", "code", "", "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not recover user password, because password confirm is empty", async () => {
		const data = makeBody("email@test.com", "code", "Password1234", "");
		const { sut } = makeSut();

		const result = sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not recover user password, because email is with type error", async () => {
		const data = makeBody(100, "code", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not recover user password, because code is with type error", async () => {
		const data = makeBody("email@test.com", 100, "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not recover user password, because password is with type error", async () => {
		const data = makeBody("email@test.com", "code", 100, "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not recover user password, because password confirm is with type error", async () => {
		const data = makeBody("email@test.com", "code", "Password1234", 100);
		const { sut } = makeSut();

		const result = sut.http({ 
			data: {
				password: data.password,
				passwordConfirm: data.passwordConfirm,
				email: data.email,
				code: data.code,
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
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
        
		expect(result).toEqual(HttpHelper.ok(data.email));
	});

});
