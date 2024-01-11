import { SendUserEmailUpdateLinkController, RequestError, HttpHelper } from "@/layers/presentation";
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

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				email: data.email
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not send user email update link, because email is empty", async () => {
		const data = makeBody("1", "");
		const { sut } = makeSut();

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				email: data.email
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not send user email update link, because email with type error", async () => {
		const data = makeBody("1", 100);
		const { sut } = makeSut();

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				email: data.email
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not send user email update link, because id with type error", async () => {
		const data = makeBody(100, "email@test.com");
		const { sut } = makeSut();

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				email: data.email
			}
		});
        
		expect(result).rejects.toThrow(RequestError);
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
        
		expect(result).toEqual(HttpHelper.ok(data.id));
	});
});
