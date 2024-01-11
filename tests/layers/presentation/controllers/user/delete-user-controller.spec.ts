import { DeleteUserController, HttpHelper, RequestError } from "@/layers/presentation";
import { DeleteUserStub } from "./stubs";

const makeSut = () => {
	const deleteUserStub = new DeleteUserStub();
	const sut = new DeleteUserController(deleteUserStub);

	return {
		sut,
		deleteUserStub
	};
};

const makeBody = (id: unknown, password: unknown, passwordConfirm: unknown) => {
	return {
		id,
		password,
		passwordConfirm
	};
};

describe("Presentation - DeleteUserController", () => {
    
	test("Should not delete user, because id is empty", async () => {
		const data = makeBody("", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = sut.http(
			{ 
				data: { 
					password: data.password, 
					passwordConfirm: data.passwordConfirm 
				}, 
				userId: data.id as string
			}
		);
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not delete user, because password is empty", async () => {
		const data = makeBody("1", "", "Password1234");
		const { sut } = makeSut();

		const result = sut.http(
			{ 
				data: { 
					password: data.password, 
					passwordConfirm: data.passwordConfirm 
				}, 
				userId: data.id as string
			}
		);
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not delete user, because passwordConfirm is empty", async () => {
		const data = makeBody("1", "Password1234", "");
		const { sut } = makeSut();

		const result = sut.http(
			{ 
				data: { 
					password: data.password, 
					passwordConfirm: data.passwordConfirm 
				}, 
				userId: data.id as string 
			}
		);
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not delete user, because id is with type error", async () => {
		const data = makeBody(100, "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = sut.http(
			{ 
				data: { 
					password: data.password, 
					passwordConfirm: data.passwordConfirm 
				}, 
				userId: data.id as string 
			}
		);
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not delete user, because password is with type error", async () => {
		const data = makeBody("1", 100, "Password1234");
		const { sut } = makeSut();

		const result = sut.http(
			{ 
				data: { 
					password: data.password, 
					passwordConfirm: data.passwordConfirm 
				}, 
				userId: data.id as string 
			}
		);
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should not delete user, because passwordConfirm is with type error", async () => {
		const data = makeBody("1", "Password1234", 100);
		const { sut } = makeSut();

		const result = sut.http(
			{ 
				data: { 
					password: data.password, 
					passwordConfirm: data.passwordConfirm 
				}, 
				userId: data.id as string 
			}
		);
        
		expect(result).rejects.toThrow(RequestError);
	});

	test("Should delete user", async () => {
		const data = makeBody("1", "Password1234", "Password1234");
		const { sut } = makeSut();

		const result = await sut.http(
			{ 
				data: { 
					password: data.password, 
					passwordConfirm: data.passwordConfirm 
				}, 
				userId: data.id as string 
			}
		);
        
		expect(result).toEqual(HttpHelper.ok(data.id));
	});
});