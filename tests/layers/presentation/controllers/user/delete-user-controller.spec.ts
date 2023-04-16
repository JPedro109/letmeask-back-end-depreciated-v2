import { DeleteUserController, MissingParamError, InvalidTypeError, badRequest, notFound, ok } from "@/layers/presentation";
import { DeleteUserStub } from "./stubs";
import { InvalidParamError, NotFoundError } from "@/layers/use-cases";

const makeSut = () => {
	const deleteUserStub = new DeleteUserStub();
	const sut = new DeleteUserController(deleteUserStub);

	return {
		sut,
		deleteUserStub
	};
};

const makeBody = (id: unknown, password: unknown, passwordConfirm: unknown) => {
	return {
		id,
		password,
		passwordConfirm
	};
};

describe("Presentation - DeleteUserController", () => {
    
	test("Should not delete user, because id is empty", async () => {
		const body = makeBody("", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle(
			{ 
				body: { 
					password: body.password, 
					passwordConfirm: body.passwordConfirm 
				}, 
				userId: body.id as string
			}
		);
        
		expect(result).toEqual(badRequest(new MissingParamError("id")));
	});

	test("Should not delete user, because password is empty", async () => {
		const body = makeBody("1", "", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle(
			{ 
				body: { 
					password: body.password, 
					passwordConfirm: body.passwordConfirm 
				}, 
				userId: body.id as string
			}
		);
        
		expect(result).toEqual(badRequest(new MissingParamError("password")));
	});

	test("Should not delete user, because passwordConfirm is empty", async () => {
		const body = makeBody("1", "Password1234", "");
		const { sut } = makeSut();

		const result = await sut.handle(
			{ 
				body: { 
					password: body.password, 
					passwordConfirm: body.passwordConfirm 
				}, 
				userId: body.id as string 
			}
		);
        
		expect(result).toEqual(badRequest(new MissingParamError("passwordConfirm")));
	});

	test("Should not delete user, because id is with type error", async () => {
		const body = makeBody(100, "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle(
			{ 
				body: { 
					password: body.password, 
					passwordConfirm: body.passwordConfirm 
				}, 
				userId: body.id as string 
			}
		);
        
		expect(result).toEqual(badRequest(new InvalidTypeError("id")));
	});

	test("Should not delete user, because password is with type error", async () => {
		const body = makeBody("1", 100, "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle(
			{ 
				body: { 
					password: body.password, 
					passwordConfirm: body.passwordConfirm 
				}, 
				userId: body.id as string 
			}
		);
        
		expect(result).toEqual(badRequest(new InvalidTypeError("password")));
	});

	test("Should not delete user, because passwordConfirm is with type error", async () => {
		const body = makeBody("1", "Password1234", 100);
		const { sut } = makeSut();

		const result = await sut.handle(
			{ 
				body: { 
					password: body.password, 
					passwordConfirm: body.passwordConfirm 
				}, 
				userId: body.id as string 
			}
		);
        
		expect(result).toEqual(badRequest(new InvalidTypeError("passwordConfirm")));
	});

	test("Should not delete user, because use case returned invalid param error", async () => {
		const body = makeBody("1", "password", "password");
		const { sut, deleteUserStub } = makeSut();
		jest.spyOn(deleteUserStub, "execute").mockReturnValueOnce(Promise.resolve(new InvalidParamError("error")));

		const result = await sut.handle(
			{ 
				body: { 
					password: body.password, 
					passwordConfirm: body.passwordConfirm 
				}, 
				userId: body.id as string 
			}
		);
        
		expect(result).toEqual(badRequest(new InvalidParamError("error")));
	});

	test("Should not delete user, because use case returned not found error", async () => {
		const body = makeBody("2", "password", "password");
		const { sut, deleteUserStub } = makeSut();
		jest.spyOn(deleteUserStub, "execute").mockReturnValueOnce(Promise.resolve(new NotFoundError("error")));

		const result = await sut.handle(
			{ 
				body: { 
					password: body.password, 
					passwordConfirm: body.passwordConfirm 
				}, 
				userId: body.id as string 
			}
		);
        
		expect(result).toEqual(notFound(new NotFoundError("error")));
	});

	test("Should delete user", async () => {
		const body = makeBody("1", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.handle(
			{ 
				body: { 
					password: body.password, 
					passwordConfirm: body.passwordConfirm 
				}, 
				userId: body.id as string 
			}
		);
        
		expect(result).toEqual(ok(body.id));
	});
});