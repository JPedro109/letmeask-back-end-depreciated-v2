import { 
	GenerationStub, 
	MailStub, 
	SecretsStub, 
	UserRepositoryStub, 
	UserVerificationCodeRepositoryStub, 
	testUserModel
} from "../__mocks__";

import { SendUserPasswordRecoveryLinkUseCase, NotFoundError } from "@/layers/use-cases";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const userVerificationCodeRepositoryStub = new UserVerificationCodeRepositoryStub();
	const generationStub = new GenerationStub();
	const mailStub = new MailStub();
	const secretsStub = new SecretsStub();
	const sut = new SendUserPasswordRecoveryLinkUseCase(
		userRepositoryStub, 
		userVerificationCodeRepositoryStub, 
		generationStub,
		mailStub,
		secretsStub
	);

	return {
		sut,
		userRepositoryStub,
		mailStub
	};
};

describe("Use case - SendUserPasswordRecoveryLinkUseCase", () => {
	test("Shoud not send user password recovery link, because user is not exists", async () => {
		const email = "email@test2.com";
		const { sut } = makeSut();

		const result = await sut.execute({ email });

		expect(result).toBeInstanceOf(NotFoundError);
	});

	test("Shoud send user password recovery link", async () => {
		const email = "email@test.com";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserByEmail").mockResolvedValueOnce(Promise.resolve(testUserModel));

		const result = await sut.execute({ email });

		expect(result).toBe(email);
	});
});