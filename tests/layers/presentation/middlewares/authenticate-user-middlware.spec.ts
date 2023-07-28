import { JsonWebTokenStub } from "./stubs";
import { JsonWebTokenInvalidError, UnauthorizedError } from "@/layers/use-cases";
import { AuthenticateUserMiddleware, ok, unauthorized } from "@/layers/presentation";

const makeSut = () => {
	const jsonWebTokenStub = new JsonWebTokenStub();
	const sut = new AuthenticateUserMiddleware(jsonWebTokenStub);
    
	return {
		sut,
		jsonWebTokenStub
	};
};

const makeBody = (token: string) => {
	return {
		authorization: token
	};
};

describe("Presentation - AuthenticateUserMiddleware", () => {
	
	test("Should not authenticate user, because token is empty", async () => {
		const { authorization } = makeBody("");
		const { sut } = makeSut();

		const result = await sut.handle({ headers: {
			authorization
		}});

		expect(result).toEqual(unauthorized(new UnauthorizedError("Você não está logado")));
	});

	test("Should not authenticate user, because Bearer is invalid ", async () => {
		const { authorization } = makeBody("B token");
		const { sut } = makeSut();

		const result = await sut.handle({ headers: {
			authorization
		}});

		expect(result).toEqual(unauthorized(new UnauthorizedError("Código inválido")));
	});

	test("Should not authenticate user, because token is invalid", async () => {
		const { authorization } = makeBody("Bearer invalid_token");
		const { sut, jsonWebTokenStub } = makeSut();
		jest.spyOn(jsonWebTokenStub, "verifyJsonWebToken").mockReturnValueOnce(new JsonWebTokenInvalidError());

		const result = await sut.handle({ headers: {
			authorization
		}});

		expect(result).toEqual(unauthorized(new JsonWebTokenInvalidError()));
	});

	test("Should authenticate user", async () => {
		const { authorization } = makeBody("Bearer token");
		const { sut } = makeSut();

		const result = await sut.handle({ headers: {
			authorization
		}});

		expect(result).toEqual(ok("1"));
	});
});