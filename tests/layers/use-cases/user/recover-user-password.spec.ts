import { 
	CryptographyStub, 
	QuestionRepositoryStub, 
	ResponseRepositoryStub, 
	RoomRepositoryStub, 
	UnitOfWorkStub, 
	UserRepositoryStub, 
	UserVerificationCodeRepositoryStub, 
	testUserModel
} from "../__mocks__";

import { InvalidUserPasswordError } from "@/layers/domain";
import { RecoverUserPasswordUseCase, InvalidParamError, NotFoundError } from "@/layers/domain";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const userVerificationCodeRepositoryStub = new UserVerificationCodeRepositoryStub();
	const roomRepositoryStub = new RoomRepositoryStub();
	const questionRepositoryStub = new QuestionRepositoryStub();
	const responseRepositoryStub = new ResponseRepositoryStub();
	const unitOfWorkStub = new UnitOfWorkStub(
		userRepositoryStub, 
		roomRepositoryStub, 
		questionRepositoryStub, 
		responseRepositoryStub, 
		userVerificationCodeRepositoryStub
	);
	const cryptographyStub = new CryptographyStub();
	const sut = new RecoverUserPasswordUseCase(unitOfWorkStub, cryptographyStub);

	return {
		sut,
		userRepositoryStub,
		cryptographyStub
	};
};

describe("Use case - RecoverUserPasswordUseCase", () => {
    
	test("Should not recover user password, because user is not exists", async () => {
		const email = "email@test.com";
		const code = "code";
		const password = "Password123456";
		const passwordConfirm = "Password12345678";
		const { sut } = makeSut();

		const result = await sut.execute({ email, code, password, passwordConfirm });

		expect(result).toBeInstanceOf(InvalidParamError);
	});

	test("Should not recover user password, because password is not respect password rules", async () => {
		const email = "email@test.com";
		const code = "code";
		const invalidPassword = "password";
		const passwordConfirm = "password";
		const { sut } = makeSut();

		const result = await sut.execute({ email, code, password: invalidPassword, passwordConfirm });

		expect(result).toBeInstanceOf(InvalidUserPasswordError);
	});

	test("Should not recover user password, because user is not exists", async () => {
		const email = "email@test2.com";
		const code = "code";
		const password = "Password123456";
		const passwordConfirm = "Password123456";
		const { sut } = makeSut();

		const result = await sut.execute({ email, code, password, passwordConfirm });

		expect(result).toBeInstanceOf(NotFoundError);
	});

	test("Should not recover user password, because user is not exists", async () => {
		const email = "email@test.com";
		const invalidToken = "invalid_token";
		const password = "Password123456";
		const passwordConfirm = "Password123456";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserByEmailWithVerificationCode").mockResolvedValue(Promise.resolve(testUserModel));

		const result = await sut.execute({ email, code: invalidToken, password, passwordConfirm });

		expect(result).toBeInstanceOf(InvalidParamError);
	});

	test("Should not recover user password, because code expiried", async () => {
		const email = "email@test.com";
		const code = "code";
		const password = "Password123456";
		const passwordConfirm = "Password123456";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserByEmailWithVerificationCode").mockResolvedValue(Promise.resolve(testUserModel));

		const result = await sut.execute({ email, code, password, passwordConfirm });

		expect(result).toBeInstanceOf(InvalidParamError);
	});

	test("Should not recover user password, because the password is match current password", async () => {
		const email = "email@test.com";
		const code = "code";
		const password = "Password1234";
		const passwordConfirm = "Password1234";
		const { sut, userRepositoryStub } = makeSut();
		jest
			.spyOn(userRepositoryStub, "getUserByEmailWithVerificationCode")
			.mockResolvedValue(Promise.resolve({ ...testUserModel, verificationTokenExpiryDate: 2^53 }));

		const result = await sut.execute({ email, code, password, passwordConfirm });

		expect(result).toBeInstanceOf(InvalidParamError);
	});

	test("Should recover user password", async () => {
		const email = "email@test.com";
		const code = "code";
		const password = "Password1234";
		const passwordConfirm = "Password1234";
		const { sut, userRepositoryStub, cryptographyStub } = makeSut();
		jest
			.spyOn(userRepositoryStub, "getUserByEmailWithVerificationCode")
			.mockResolvedValue(Promise.resolve({ ...testUserModel, verificationTokenExpiryDate: 2^53 }));
		jest.spyOn(cryptographyStub, "compareHash").mockReturnValueOnce(Promise.resolve(false));

		const result = await sut.execute({ email, code, password, passwordConfirm });

		expect(result).toBe(email);
	});
});