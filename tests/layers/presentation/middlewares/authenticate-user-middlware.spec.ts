import { JsonWebTokenStub } from "./stubs";
import { JsonWebTokenInvalidError, UnauthorizedError } from "@/layers/application";
import { AuthUserMiddleware, HttpHelper } from "@/layers/presentation";

const makeSut = () => {
	const jsonWebTokenStub = new JsonWebTokenStub();
	const sut = new AuthUserMiddleware(jsonWebTokenStub);
    
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

describe("Presentation - AuthUserMiddleware", () => {
	
	test("Should not authenticate user, because token is empty", async () => {
		const { authorization } = makeBody("");
		const { sut } = makeSut();

		const result = await sut.http({ headers: {
			authorization
		}});

		expect(result).toEqual(HttpHelper.unauthorized(new UnauthorizedError("Você não está logado")));
	});

	test("Should not authenticate user, because Bearer is invalid ", async () => {
		const { authorization } = makeBody("B token");
		const { sut } = makeSut();

		const result = await sut.http({ headers: {
			authorization
		}});

		expect(result).toEqual(HttpHelper.unauthorized(new UnauthorizedError("Código inválido")));
	});

	test("Should not authenticate user, because token is invalid", async () => {
		const { authorization } = makeBody("Bearer invalid_token");
		const { sut, jsonWebTokenStub } = makeSut();
		jest.spyOn(jsonWebTokenStub, "verifyJsonWebToken").mockReturnValueOnce(new JsonWebTokenInvalidError());

		const result = await sut.http({ headers: {
			authorization
		}});

		expect(result).toEqual(HttpHelper.unauthorized(new JsonWebTokenInvalidError()));
	});

	test("Should authenticate user", async () => {
		const { authorization } = makeBody("Bearer token");
		const { sut } = makeSut();

		const result = await sut.http({ headers: {
			authorization
		}});

		expect(result).toEqual(HttpHelper.noBody());
	});
});