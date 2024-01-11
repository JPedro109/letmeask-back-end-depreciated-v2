import { SendUserPasswordRecoveryLinkController, ok, RequestError } from "@/layers/presentation";
import { SendUserPasswordRecoveryLinkStub } from "./stubs";

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

		const result = sut.http({ data });
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not send user password recovery link, because email is with type error", async () => {
		const data = makeBody(100);
		const { sut } = makeSut();

		const result = sut.http({ data });
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should send user password recovery link", async () => {
		const data = makeBody("email@test.com");
		const { sut } = makeSut();

		const result = await sut.http({ data });
        
		expect(result).toEqual(ok(data.email));
	});
});
