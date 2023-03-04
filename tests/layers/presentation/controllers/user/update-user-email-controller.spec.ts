import { UpdateUserEmailController, MissingParamError, badRequest, ok, InvalidTypeError } from "@/layers/presentation";
import { UpdateUserEmailStub } from "./stubs";

const makeSut = () => {
	const updateUserEmailStub = new UpdateUserEmailStub();
	const sut = new UpdateUserEmailController(updateUserEmailStub);

	return {
		sut,
		updateUserEmailStub
	};
};

const makeBody = (id: unknown, email: unknown, code: unknown) => {
	return {
		id,
		email,
		code
	};
};

describe("Presentation - UpdateUserEmailController", () => {
    
	test("Should not update user email, because id is empty", async () => {
		const body = makeBody("", "email@test.com", "code");
		const { sut } = makeSut();

		const result = await sut.handle({ 
			userId: body.id as string,
			query: {
				email: body.email,
				code: body.code
			} 
		});
        
		expect(result).toEqual(badRequest(new MissingParamError("id")));
	});


	test("Should not update user email, because email is empty", async () => {
		const body = makeBody("1", "", "code");
		const { sut } = makeSut();

		const result = await sut.handle({ 
			userId: body.id as string,
			query: {
				email: body.email,
				code: body.code
			} 
		});
        
		expect(result).toEqual(badRequest(new MissingParamError("email")));
	});

	test("Should not update user email, because code is empty", async () => {
		const body = makeBody("1", "email@test.com", "");
		const { sut } = makeSut();

		const result = await sut.handle({ 
			userId: body.id as string,
			query: {
				email: body.email,
				code: body.code
			} 
		});
        
		expect(result).toEqual(badRequest(new MissingParamError("code")));
	});

	test("Should not update user email, because id is with type error", async () => {
		const body = makeBody(100, "email@test.com", "code");
		const { sut } = makeSut();

		const result = await sut.handle({ 
			userId: body.id as string,
			query: {
				email: body.email,
				code: body.code
			} 
		});
        
		expect(result).toEqual(badRequest(new InvalidTypeError("id")));
	});


	test("Should not update user email, because email is with type error", async () => {
		const body = makeBody("1", 100, "code");
		const { sut } = makeSut();

		const result = await sut.handle({ 
			userId: body.id as string,
			query: {
				email: body.email,
				code: body.code
			} 
		});
        
		expect(result).toEqual(badRequest(new InvalidTypeError("email")));
	});

	test("Should not update user email, because code is with type error", async () => {
		const body = makeBody("1", "email@test.com", 100);
		const { sut } = makeSut();

		const result = await sut.handle({ 
			userId: body.id as string,
			query: {
				email: body.email,
				code: body.code
			} 
		});
        
		expect(result).toEqual(badRequest(new InvalidTypeError("code")));
	});

	test("Should not update user email, because use returned error", async () => {
		const body = makeBody("2", "email.com", "token_invalid");
		const { sut, updateUserEmailStub } = makeSut();
		jest.spyOn(updateUserEmailStub, "execute").mockReturnValueOnce(Promise.resolve(new Error("error")));

		const result = await sut.handle({ 
			userId: body.id as string,
			query: {
				email: body.email,
				code: body.code
			} 
		});
        
		expect(result).toEqual(badRequest(new Error("error")));
	});

	test("Should update user email", async () => {
		const body = makeBody("1", "email@test.com", "code");
		const { sut } = makeSut();

		const result = await sut.handle({ 
			userId: body.id as string,
			query: {
				email: body.email,
				code: body.code
			} 
		});
        
		expect(result).toEqual(ok(body.id));
	});
});