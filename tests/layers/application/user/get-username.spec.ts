import { UserRepositoryStub } from "../__mocks__";
import { GetUsernameUseCase, NotFoundError } from "@/layers/application";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const sut = new GetUsernameUseCase(userRepositoryStub);

	return {
		userRepositoryStub,
		sut
	};
};

describe("Use case - GetUsernameUseCase", () => {
    
	test("Should not get username, because user is not exists", () => {
		const id = "2";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(null);

		const result = sut.execute({ id });

		expect(result).rejects.toThrow(NotFoundError);
	});

	test("Should get username", async () => {
		const id = "1";
		const { sut } = makeSut();

		const result = await sut.execute({ id });

		expect(result).toBe("username");
	});
});
