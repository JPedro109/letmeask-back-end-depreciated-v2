import { CryptographyStub, UserRepositoryStub } from "../__mocks__";

import { UpdateUserPasswordUseCase, InvalidParamError, NotFoundError, DomainError } from "@/layers/domain";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const cryptographyStub = new CryptographyStub();
	const sut = new UpdateUserPasswordUseCase(userRepositoryStub, cryptographyStub);

	return {
		sut,
		userRepositoryStub,
		cryptographyStub
	};
};

describe("Use case - UpdateUserPasswordUseCase", () => {

	test("Should not update user password, because passwords is not match", async () => {
		const id = "1";
		const password = "Password1234";
		const newPassword = "Password12345";
		const newPasswordConfirm = "Password12";
		const { sut } = makeSut();

		const result = sut.execute({ id, password, newPassword, newPasswordConfirm });

		expect(result).rejects.toThrow(InvalidParamError);
	});

	test("Should not update user password, because new password is not respect password rules", async () => {
		const id = "2";
		const password = "Password1234";
		const newPassword = "password";
		const newPasswordConfirm = "password";
		const { sut } = makeSut();

		const result = sut.execute({ id, password, newPassword, newPasswordConfirm });

		expect(result).rejects.toThrow(DomainError);
	});

	test("Should not update user password, because user is not exists", async () => {
		const id = "2";
		const password = "Password1234";
		const newPassword = "Password12345";
		const newPasswordConfirm = "Password12345";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(null);

		const result = sut.execute({ id, password, newPassword, newPasswordConfirm });

		expect(result).rejects.toThrow(NotFoundError);
	});

	test("Should not update user password, because password is not match with current password", async () => {
		const id = "1";
		const password = "Password12345678";
		const newPassword = "Password12345";
		const newPasswordConfirm = "Password12345";
		const { sut, cryptographyStub } = makeSut();
		jest.spyOn(cryptographyStub, "compareHash").mockReturnValueOnce(Promise.resolve(false));

		const result = sut.execute({ id, password, newPassword, newPasswordConfirm });

		expect(result).rejects.toThrow(InvalidParamError);
	});

	test("Should not update user password, because new password is match with current password", async () => {
		const id = "1";
		const password = "Password12345";
		const newPassword = "Password12345";
		const newPasswordConfirm = "Password12345";
		const { sut } = makeSut();

		const result = sut.execute({ id, password, newPassword, newPasswordConfirm });

		expect(result).rejects.toThrow(InvalidParamError);
	});

	test("Should update user password", async () => {
		const id = "1";
		const password = "Password1234";
		const newPassword = "Password12345";
		const newPasswordConfirm = "Password12345";
		const { sut } = makeSut();

		const result = await sut.execute({ id, password, newPassword, newPasswordConfirm });

		expect(result).toBe(id);
	});
});
