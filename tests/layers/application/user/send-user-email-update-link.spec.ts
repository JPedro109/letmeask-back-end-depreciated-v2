import { 
	GenerationStub,
	MailStub,
	SecretsStub,
	UserRepositoryStub, 
	UserVerificationCodeRepositoryStub, 
	testUserModel
} from "../__mocks__";
import { SendUserEmailUpdateLinkUseCase, InvalidParamError, NotFoundError } from "@/layers/application";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const userVerificationCodeRepositoryStub = new UserVerificationCodeRepositoryStub();
	const mailStub = new MailStub();
	const generateStub = new GenerationStub();
	const secretsStub = new SecretsStub();
	const sut = new SendUserEmailUpdateLinkUseCase(
		userRepositoryStub, 
		userVerificationCodeRepositoryStub, 
		generateStub, 
		mailStub,
		secretsStub
	);

	return {
		sut,
		userRepositoryStub,
		mailStub
	};
};

describe("Use case SendUserEmailUpdateLinkUseCase", () => {
	test("Shoud not send user email update link, because user is not exists", async () => {
		const id = "2";
		const email = "email@test2.com";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(null);

		const result = sut.execute({ id, email });

		expect(result).rejects.toThrow(NotFoundError);
	});

	test("Shoud not send user email update link, because email already register", async () => {
		const id = "1";
		const email = "email@test.com";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserByEmail").mockResolvedValueOnce(testUserModel);

		const result = sut.execute({ id, email });

		expect(result).rejects.toThrow(InvalidParamError);
	});

	test("Shoud send user email update link", async () => {
		const id = "1";
		const email = "email@test2.com";
		const { sut } = makeSut();

		const result = await sut.execute({ id, email });

		expect(result).toBe(email);
	});
});
