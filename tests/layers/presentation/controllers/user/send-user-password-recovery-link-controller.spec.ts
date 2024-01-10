import { SendUserPasswordRecoveryLinkController, MissingParamError, badRequest, ok, notFound, InvalidTypeError } from "@/layers/presentation";
import { SendUserPasswordRecoveryLinkStub } from "./stubs";
import { InvalidParamError, NotFoundError } from "@/layers/domain";

const makeSut = () => {
	const sendUserPasswordRecoveryLinkStub = new SendUserPasswordRecoveryLinkStub();
	const sut = new SendUserPasswordRecoveryLinkController(sendUserPasswordRecoveryLinkStub);

	return {
		sut,
		sendUserPasswordRecoveryLinkStub
	};
};

const makeBody = (email: unknown) => {
	return {
		email
	};
};

describe("Presentation - SendUserPasswordRecoveryLinkController", () => {
    
	test("Should not send user password recovery link, because email is empty", async () => {
		const data = makeBody("");
		const { sut } = makeSut();

		const result = await sut.http({ data });
        
		expect(result).toEqual(badRequest(new MissingParamError("email")));
	});

	test("Should not send user password recovery link, because email is with type error", async () => {
		const data = makeBody(100);
		const { sut } = makeSut();

		const result = await sut.http({ data });
        
		expect(result).toEqual(badRequest(new InvalidTypeError("email")));
	});

	test("Should not send user password recovery link, because use case returned invalid param error", async () => {
		const data = makeBody("email.com");
		const { sut, sendUserPasswordRecoveryLinkStub } = makeSut();
		jest.spyOn(sendUserPasswordRecoveryLinkStub, "execute").mockResolvedValueOnce(Promise.resolve(new InvalidParamError("error")));

		const result = await sut.http({ data });
        
		expect(result).toEqual(badRequest(new InvalidParamError("error")));
	});

	test("Should not send user password recovery link, because use case returned not found error", async () => {
		const data = makeBody("email.com");
		const { sut, sendUserPasswordRecoveryLinkStub } = makeSut();
		jest.spyOn(sendUserPasswordRecoveryLinkStub, "execute").mockResolvedValueOnce(Promise.resolve(new NotFoundError("error")));

		const result = await sut.http({ data });
        
		expect(result).toEqual(notFound(new NotFoundError("error")));
	});

	test("Should send user password recovery link", async () => {
		const data = makeBody("email@test.com");
		const { sut } = makeSut();

		const result = await sut.http({ data });
        
		expect(result).toEqual(ok(data.email));
	});
});