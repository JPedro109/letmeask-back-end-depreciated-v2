import { CryptographyStub, UserRepositoryStub } from "../__mocks__";

import { DeleteUserUseCase, InvalidParamError, NotFoundError } from "@/layers/domain";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const cryptographyStub = new CryptographyStub();
	const sut = new DeleteUserUseCase(userRepositoryStub, cryptographyStub);

	return {
		sut,
		userRepositoryStub,
		cryptographyStub
	};
};

describe("Use case - DeleteUserUseCase", () => {

	test("Should not delete user, because passwords is not match", () => {
		const id = "1";
		const password = "Password1234";
		const passwordConfirm = "Password12345";
		const { sut } = makeSut();

		const result = sut.execute({ id, password, passwordConfirm });

		expect(result).rejects.toThrow(InvalidParamError);
	});

	test("Should not delete user, because user is not exists", () => {
		const id = "2";
		const password = "Password1234";
		const passwordConfirm = "Password1234";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(null);

		const result = sut.execute({ id, password, passwordConfirm });

		expect(result).rejects.toThrow(NotFoundError);
	});
    
	test("Should not delete user, because password is invalid", () => {
		const id = "1";
		const password = "Password12345";
		const passwordConfirm = "Password12345";
		const { sut, cryptographyStub } = makeSut();
		jest.spyOn(cryptographyStub, "compareHash").mockReturnValueOnce(Promise.resolve(false));

		const result = sut.execute({ id, password, passwordConfirm });

		expect(result).rejects.toThrow(InvalidParamError);
	});

	test("Should delete user", async () => {
		const id = "1";
		const password = "Password1234";
		const passwordConfirm = "Password1234";
		const { sut } = makeSut();

		const result = await sut.execute({ id, password, passwordConfirm });

		expect(result).toBe(id);
	});
});
