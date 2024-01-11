import { InvalidUserEmailError } from "@/layers/domain";
import { 
	QuestionRepositoryStub, 
	ResponseRepositoryStub, 
	RoomRepositoryStub, 
	UnitOfWorkStub, 
	UserRepositoryStub, 
	UserVerificationCodeRepositoryStub, 
	testUserModel
} from "../__mocks__";

import { UpdateUserEmailUseCase, InvalidParamError, NotFoundError } from "@/layers/domain";

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
	const sut = new UpdateUserEmailUseCase(unitOfWorkStub);

	return {
		sut,
		userRepositoryStub
	};
};

describe("Use case - UpdateUserEmailUseCase", () => {
    
	test("Should not update user email, because email is invalid", async () => {
		const id = "2";
		const email = "invalid_email";
		const code = "code";
		const { sut } = makeSut();

		const result = sut.execute({ id, email, code });

		expect(result).rejects.toThrow(InvalidUserEmailError);
	});
	
	test("Should not update user email, because user is not exists", async () => {
		const id = "2";
		const email = "email@test2.com";
		const code = "code";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserByIdWithVerificationCode").mockReturnValueOnce(null);

		const result = sut.execute({ id, email, code });

		expect(result).rejects.toThrow(NotFoundError);
	});

	test("Should not update user email, because code is invalid", async () => {
		const id = "1";
		const email = "email@test2.com";
		const invalidToken = "invalid_token";
		const { sut, userRepositoryStub } = makeSut();
		jest
			.spyOn(userRepositoryStub, "getUserByIdWithVerificationCode")
			.mockReturnValueOnce(Promise.resolve({ ...testUserModel, userVerificationCode: null }));

		const result = sut.execute({ id, email, code: invalidToken });

		expect(result).rejects.toThrow(InvalidParamError);
	});

	test("Should not update user email, because code expiried", async () => {
		const id = "1";
		const email = "email@test2.com";
		const code = "code";
		const { sut, userRepositoryStub } = makeSut();
		jest
			.spyOn(userRepositoryStub, "getUserByIdWithVerificationCode")
			.mockReturnValueOnce(
				Promise.resolve(
					{ 
						...testUserModel, 
						userVerificationCode: { ...testUserModel.userVerificationCode, verificationCodeExpiryDate: 0 } 
					}
				));

		const result = sut.execute({ id, email, code });

		expect(result).rejects.toThrow(InvalidParamError);
	});

	test("Should update user email", async () => {
		const id = "1";
		const email = "email@test2.com";
		const code = "code";
		const { sut } = makeSut();

		const result = await sut.execute({ id, email, code });

		expect(result).toBe(id);
	});
});
