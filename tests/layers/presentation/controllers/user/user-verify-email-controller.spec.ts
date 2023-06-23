import { UserVerifyEmailController, MissingParamError, badRequest, ok, notFound, unauthorized, InvalidTypeError } from "@/layers/presentation";
import { UserVerifyEmailStub } from "./stubs";
import { InvalidParamError, NotFoundError, UnauthorizedError } from "@/layers/use-cases";

const makeSut = () => {
	const userVerifyEmailStub = new UserVerifyEmailStub();
	const sut = new UserVerifyEmailController(userVerifyEmailStub);

	return {
		sut,
		userVerifyEmailStub
	};
};

const makeBody = (email: unknown, code: unknown) => {
	return {
		email,
		code
	};
};

describe("Presentation - UserVerifyEmailController", () => {
    
	test("Should not verify email user, because email is empty", async () => {
		const data = makeBody("", "code");
		const { sut } = makeSut();

		const result = await sut.handle({ 
			data: data
		});
        
		expect(result).toEqual(badRequest(new MissingParamError("email")));
	});

	test("Should not verify email user, because code is empty", async () => {
		const data = makeBody("email@test.com", "");
		const { sut } = makeSut();

		const result = await sut.handle({ 
			data: data
		});
        
		expect(result).toEqual(badRequest(new MissingParamError("code")));
	});

	test("Should not verify email user, because email is with type error", async () => {
		const data = makeBody(100, "code");
		const { sut } = makeSut();

		const result = await sut.handle({ 
			data: data
		});
        
		expect(result).toEqual(badRequest(new InvalidTypeError("email")));
	});

	test("Should not verify email user, because code is with type error", async () => {
		const data = makeBody("email@test.com", 100);
		const { sut } = makeSut();

		const result = await sut.handle({ 
			data: data
		});
        
		expect(result).toEqual(badRequest(new InvalidTypeError("code")));
	});

	test("Should not verify email user, because use case returned not found error", async () => {
		const data = makeBody("email_invalid@test.com", "code");
		const { sut, userVerifyEmailStub } = makeSut();
		jest.spyOn(userVerifyEmailStub, "execute").mockResolvedValueOnce(new NotFoundError("error"));

		const result = await sut.handle({ 
			data: data
		});
        
		expect(result).toEqual(notFound(new NotFoundError("error")));
	});
	
	test("Should not verify email user, because use case returned unauthorized error", async () => {
		const data = makeBody("email_verified_and_with_room@test.com", "code");
		const { sut, userVerifyEmailStub } = makeSut();
		jest.spyOn(userVerifyEmailStub, "execute").mockResolvedValueOnce(new UnauthorizedError("error"));

		const result = await sut.handle({ 
			data: data
		});
        
		expect(result).toEqual(unauthorized(new UnauthorizedError("error")));
	});

	test("Should not verify email user, because use case returned invalid param error", async () => {
		const data = makeBody("email@test.com", "token_invalid");
		const { sut, userVerifyEmailStub } = makeSut();
		jest.spyOn(userVerifyEmailStub, "execute").mockResolvedValueOnce(new InvalidParamError("error"));

		const result = await sut.handle({ 
			data: data
		});
        
		expect(result).toEqual(badRequest(new InvalidParamError("error")));
	});

	test("Should verify email user", async () => {
		const data = makeBody("email@test.com", "code");
		const { sut } = makeSut();

		const result = await sut.handle({ 
			data: data
		});
        
		expect(result).toEqual(ok(data.email));
	});
});