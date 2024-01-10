import { UserRepositoryStub } from "../__mocks__";

import { InvalidUsernameError } from "@/layers/domain";
import { NotFoundError, UpdateUsernameUseCase } from "@/layers/domain";

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

		const result = await sut.execute({ id, username });

		expect(result).toBeInstanceOf(InvalidUsernameError);
	});

	test("Should not update username, because username is not exists", async () => {
		const id = "2";
		const username = "username";
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(Promise.resolve(null));

		const result = await sut.execute({ id, username });

		expect(result).toBeInstanceOf(NotFoundError);
	});

	test("Should update username", async () => {
		const id = "1";
		const username = "username";
		const { sut } = makeSut();

		const result = await sut.execute({ id, username });

		expect(result).toBe(username);
	});
});