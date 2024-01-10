import { 
	CryptographyStub,
	GenerationStub,
	MailStub,
	QuestionRepositoryStub, 
	ResponseRepositoryStub, 
	RoomRepositoryStub, 
	SecretsStub, 
	UnitOfWorkStub, 
	UserRepositoryStub, 
	UserVerificationCodeRepositoryStub, 
	testUserModel
} from "../__mocks__";

import { CreateUserUseCase, InvalidParamError } from "@/layers/domain";

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
	const mailStub = new MailStub();
	const cryptographyStub = new CryptographyStub();
	const generationStub = new GenerationStub();
	const secretsStub = new SecretsStub();
	const sut = new CreateUserUseCase(unitOfWorkStub, mailStub, cryptographyStub, generationStub, secretsStub);

	return {
		sut,
		userRepositoryStub,
	};
};

describe("Use case - CreateUserUseCase", () => {

	test("Shoud not create user, because passwords is not match", async () => {
		const email = "email@test2.com";
		const username = "username";
		const password = "Password1234";
		const invalidPasswordConfirm = "Password123456";
		const { sut } = makeSut();

		const result = await sut.execute({ email, username, password, passwordConfirm: invalidPasswordConfirm });

		expect(result).toBeInstanceOf(InvalidParamError);
	});

	test("Shoud not create user, because email already is exists", async () => {
		const email = "email@test.com";
		const username = "username";
		const password = "Password1234";
		const passwordConfirm = "Password1234";
		const { sut, userRepositoryStub } = makeSut();
		jest
			.spyOn(userRepositoryStub, "getUserByEmail")
			.mockReturnValueOnce(Promise.resolve(testUserModel));

		const result = await sut.execute({ email, username, password, passwordConfirm });

		expect(result).toBeInstanceOf(InvalidParamError);
	});

	test("Shoud not create user, because the user rules are not respects", async () => {
		const email = "emailtest2.com";
		const username = "u".repeat(300);
		const password = "password";
		const passwordConfirm = "password";
		const { sut } = makeSut();

		const result = await sut.execute({ email, username, password, passwordConfirm });

		expect(result).toBeInstanceOf(Error);
	});

	test("Shoud create user", async () => {
		const email = "email@test2.com";
		const username = "username";
		const password = "Password1234";
		const passwordConfirm = "Password1234";
		const { sut } = makeSut();

		const result = await sut.execute({ email, username, password, passwordConfirm });

		expect(result).toBe(email);
	});
});