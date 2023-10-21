import { 
	GenerationStub,
	MailStub,
	UserRepositoryStub, 
	UserVerificationCodeRepositoryStub, 
	testUserModel
} from "../__mocks__";

import { InvalidEmailError } from "@/layers/entities";
import { SendUserEmailUpdateLinkUseCase, InvalidParamError, NotFoundError } from "@/layers/use-cases";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const userVerificationCodeRepositoryStub = new UserVerificationCodeRepositoryStub();
	const mailStub = new MailStub();
	const generateStub = new GenerationStub();
	const sut = new SendUserEmailUpdateLinkUseCase(
		userRepositoryStub, 
		userVerificationCodeRepositoryStub, 
		generateStub, 
		mailStub
	);

	return {
		sut,
		userRepositoryStub,
		mailStub
	};
};

describe("Use case SendUserEmailUpdateLinkUseCase", () => {
	test("Shoud not send user email update link, because email is invald", async () => {
		const id = "1";
		const email = "email.com";
		const { sut } = makeSut();

		const result = await sut.execute({ id, email });

		expect(result).toBeInstanceOf(InvalidEmailError);
	});

	test("Shoud not send user email update link, because user is not exists", async () => {
		const id = "2";
		const email = "email@test2.com";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(null);

		const result = await sut.execute({ id, email });

		expect(result).toBeInstanceOf(NotFoundError);
	});

	test("Shoud not send user email update link, because email already register", async () => {
		const id = "1";
		const email = "email@test.com";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserByEmail").mockResolvedValueOnce(testUserModel);

		const result = await sut.execute({ id, email });

		expect(result).toBeInstanceOf(InvalidParamError);
	});

	test("Shoud send user email update link", async () => {
		const id = "1";
		const email = "email@test2.com";
		const { sut } = makeSut();

		const result = await sut.execute({ id, email });

		expect(result).toBe(email);
	});
});