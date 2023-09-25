import { SendUserEmailUpdateLinkController, MissingParamError, badRequest, ok, InvalidTypeError } from "@/layers/presentation";
import { SendUserEmailUpdateLinkStub } from "./stubs";

const makeSut = () => {
	const sendUserEmailUpdateLinkStub = new SendUserEmailUpdateLinkStub();
	const sut = new SendUserEmailUpdateLinkController(sendUserEmailUpdateLinkStub);

	return {
		sut,
		sendUserEmailUpdateLinkStub
	};
};

const makeBody = (id: unknown, email: unknown) => {
	return {
		id,
		email
	};
};

describe("Presentation - SendUserEmailUpdateLinkStub", () => {
    
	test("Should not send user email update link, because id is empty", async () => {
		const data = makeBody("", "email@test.com");
		const { sut } = makeSut();

		const result = await sut.http({ 
			userId: data.id as string,
			data: {
				email: data.email
			}
		});
        
		expect(result).toEqual(badRequest(new MissingParamError("id")));
	});

	test("Should not send user email update link, because email is empty", async () => {
		const data = makeBody("1", "");
		const { sut } = makeSut();

		const result = await sut.http({ 
			userId: data.id as string,
			data: {
				email: data.email
			}
		});
        
		expect(result).toEqual(badRequest(new MissingParamError("email")));
	});

	test("Should not send user email update link, because email with type error", async () => {
		const data = makeBody("1", 100);
		const { sut } = makeSut();

		const result = await sut.http({ 
			userId: data.id as string,
			data: {
				email: data.email
			}
		});
        
		expect(result).toEqual(badRequest(new InvalidTypeError("email")));
	});

	test("Should not send user email update link, because id with type error", async () => {
		const data = makeBody(100, "email@test.com");
		const { sut } = makeSut();

		const result = await sut.http({ 
			userId: data.id as string,
			data: {
				email: data.email
			}
		});
        
		expect(result).toEqual(badRequest(new InvalidTypeError("id")));
	});

	test("Should not send user email update link, because use case returned error", async () => {
		const data = makeBody("1", "email@test.com");
		const { sut, sendUserEmailUpdateLinkStub } = makeSut();
		jest.spyOn(sendUserEmailUpdateLinkStub, "execute").mockReturnValueOnce(Promise.resolve(new Error("error")));

		const result = await sut.http({ 
			userId: data.id as string,
			data: {
				email: data.email
			}
		});
        
		expect(result).toEqual(badRequest(new Error("error")));
	});

	test("Should send user email update link", async () => {
		const data = makeBody("1", "email@test.com");
		const { sut } = makeSut();

		const result = await sut.http({ 
			userId: data.id as string,
			data: {
				email: data.email
			}
		});
        
		expect(result).toEqual(ok(data.id));
	});
});