import { UserRepositoryStub } from "../__mocks__";

import { GetUsernameUseCase, NotFoundError } from "@/layers/use-cases";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const sut = new GetUsernameUseCase(userRepositoryStub);

	return {
		userRepositoryStub,
		sut
	};
};

describe("Use case - GetUsernameUseCase", () => {
    
	test("Should not get username, because user is not exists", async () => {
		const id = "2";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(Promise.resolve(null));

		const result = await sut.execute({ id });

		expect(result).toBeInstanceOf(NotFoundError);
	});

	test("Should get username", async () => {
		const id = "1";
		const { sut } = makeSut();

		const result = await sut.execute({ id });

		expect(result).toBe("username");
	});
});