import { UserVerifyEmailController, ok, RequestError } from "@/layers/presentation";
import { UserVerifyEmailStub } from "./stubs";

const makeSut = () => {
	const userVerifyEmailStub = new UserVerifyEmailStub();
	const sut = new UserVerifyEmailController(userVerifyEmailStub);

	return {
		sut,
		userVerifyEmailStub
	};
};

const makeBody = (email: unknown, code: unknown) => {
	return {
		email,
		code
	};
};

describe("Presentation - UserVerifyEmailController", () => {
    
	test("Should not verify email user, because email is empty", async () => {
		const data = makeBody("", "code");
		const { sut } = makeSut();

		const result = sut.http({ data });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not verify email user, because code is empty", async () => {
		const data = makeBody("email@test.com", "");
		const { sut } = makeSut();

		const result = sut.http({ data });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not verify email user, because email is with type error", async () => {
		const data = makeBody(100, "code");
		const { sut } = makeSut();

		const result = sut.http({ data });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not verify email user, because code is with type error", async () => {
		const data = makeBody("email@test.com", 100);
		const { sut } = makeSut();

		const result = sut.http({ data });

		expect(result).rejects.toThrow(RequestError);
	});

	test("Should verify email user", async () => {
		const data = makeBody("email@test.com", "code");
		const { sut } = makeSut();

		const result = sut.http({ data });

		await expect(result).resolves.toEqual(ok(data.email));
	});
});
