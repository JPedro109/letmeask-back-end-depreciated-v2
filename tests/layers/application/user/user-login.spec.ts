import { CryptographyStub, JsonWebTokenStub, UserRepositoryStub, testUserModel } from "../__mocks__";
import { UserLoginUseCase, UnauthorizedError} from "@/layers/application";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const cryptographyStub = new CryptographyStub();
	const jsonWebTokenStub = new JsonWebTokenStub();
	const sut = new UserLoginUseCase(userRepositoryStub, cryptographyStub, jsonWebTokenStub);

	return {
		sut,
		userRepositoryStub,
		cryptographyStub,
		jsonWebTokenStub
	};
};

describe("Use case - UserLoginUseCase", () => {
	test("Should not login the user, because email is incorrect", async () => {
		const email = "email@test.com";
		const password = "hash_password";
		const { sut } = makeSut();
        
		const result = sut.execute({ email, password });

		expect(result).rejects.toThrow(UnauthorizedError);
	});

	test("Should not login the user, because password is incorrect", async () => {
		const email = "email@test.com";
		const password = "hash_password";
		const { sut, userRepositoryStub, cryptographyStub } = makeSut();
		jest
			.spyOn(userRepositoryStub, "getUserByEmail")
			.mockResolvedValue(testUserModel);
		jest
			.spyOn(cryptographyStub, "compareHash")
			.mockResolvedValue(false);
        
		const result = sut.execute({ email, password });

		expect(result).rejects.toThrow(UnauthorizedError);
	});

	test("Should not login the user, because email is not verified", async () => {
		const email = "email@test.com";
		const password = "hash_password";
		const { sut, userRepositoryStub } = makeSut();
		jest
			.spyOn(userRepositoryStub, "getUserByEmail")
			.mockResolvedValue({ ...testUserModel, verifiedEmail: false });

		const result = sut.execute({ email, password });

		expect(result).rejects.toThrow(UnauthorizedError);
	});

	test("Should login the user", async () => {
		const email = "email@test.com";
		const password = "hash_password";
		const { sut, userRepositoryStub } = makeSut();
		jest
			.spyOn(userRepositoryStub, "getUserByEmail")
			.mockResolvedValueOnce(testUserModel);
        
		const result = await sut.execute({ email, password });

		expect(result).toBe("jwt");
	});
});
