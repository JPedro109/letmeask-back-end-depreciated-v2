import { UserRepositoryStub } from "../__mocks__";

import { DomainError, NotFoundError, UpdateUsernameUseCase } from "@/layers/domain";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const sut = new UpdateUsernameUseCase(userRepositoryStub);

	return {
		userRepositoryStub,
		sut
	};
};

describe("Use case - UpdateUsernameUseCase", () => {
    
	test("Should not update username, because username is invalid", async () => {
		const id = "1";
		const username = "u".repeat(300);
		const { sut } = makeSut();

		const result = sut.execute({ id, username });

		expect(result).rejects.toThrow(DomainError);
	});

	test("Should not update username, because username is not exists", async () => {
		const id = "2";
		const username = "username";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(null);

		const result = sut.execute({ id, username });

		expect(result).rejects.toThrow(NotFoundError);
	});

	test("Should update username", async () => {
		const id = "1";
		const username = "username";
		const { sut } = makeSut();

		const result = await sut.execute({ id, username });

		expect(result).toBe(username);
	});
});
