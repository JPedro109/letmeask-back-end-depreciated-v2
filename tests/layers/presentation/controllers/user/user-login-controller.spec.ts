import { UserLoginController, ok, RequestError } from "@/layers/presentation";
import { UserLoginStub } from "./stubs";

const makeSut = () => {
	const userLoginStub = new UserLoginStub();
	const sut = new UserLoginController(userLoginStub);

	return {
		sut,
		userLoginStub
	};
};

const makeBody = (email: unknown, password: unknown) => {
	return {
		email,
		password
	};
};

describe("Presentation - UserLoginController", () => {
    
	test("Should not login user, because email is empty", async () => {
		const data = makeBody("", "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ data });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not login user, because password is empty", async () => {
		const data = makeBody("email@test.com", "");
		const { sut } = makeSut();

		const result = sut.http({ data });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not login user, because email is with type error", async () => {
		const data = makeBody(100, "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ data });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not login user, because password is with type error", async () => {
		const data = makeBody("email@test.com", 100);
		const { sut } = makeSut();

		const result = sut.http({ data });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should login user", async () => {
		const data = makeBody("email@test.com", "Password1234");
		const { sut } = makeSut();

		const result = sut.http({ data });

		await expect(result).resolves.toEqual(ok("code"));
	});
});
