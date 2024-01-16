import { UpdateUserPasswordController, InvalidRequestError, HttpHelper } from "@/layers/presentation";
import { UpdateUserPasswordStub } from "./stubs";

const makeSut = () => {
	const updateUserPasswordStub = new UpdateUserPasswordStub();
	const sut = new UpdateUserPasswordController(updateUserPasswordStub);

	return {
		sut,
		updateUserPasswordStub
	};
};

const makeBody = (id: unknown, password: unknown, newPassword: unknown, newPasswordConfirm: unknown) => {
	return {
		id,
		password,
		newPassword,
		newPasswordConfirm
	};
};

describe("Presentation - UpdateUserPasswordController", () => {
    
	test("Should not update user password, because id is empty", async () => {
		const data = makeBody("", "Password1234", "Password12345", "Password12345");
		const { sut } = makeSut();

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				password: data.password,
				newPassword: data.newPassword,
				newPasswordConfirm: data.newPasswordConfirm,
			}
		});
        
		expect(result).rejects.toThrow(InvalidRequestError);
	});
	
	test("Should not update user password, because password is empty", async () => {
		const data = makeBody("1", "", "Password12345", "Password12345");
		const { sut } = makeSut();

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				password: data.password,
				newPassword: data.newPassword,
				newPasswordConfirm: data.newPasswordConfirm,
			}
		});
        
		expect(result).rejects.toThrow(InvalidRequestError);
	});

	test("Should not update user password, because new password is empty", async () => {
		const data = makeBody("1", "Password1234", "", "Password12345");
		const { sut } = makeSut();

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				password: data.password,
				newPassword: data.newPassword,
				newPasswordConfirm: data.newPasswordConfirm,
			}
		});
        
		expect(result).rejects.toThrow(InvalidRequestError);
	});

	test("Should not update user password, because new password confirm is empty", async () => {
		const data = makeBody("1", "Password1234", "Password12345", "");
		const { sut } = makeSut();

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				password: data.password,
				newPassword: data.newPassword,
				newPasswordConfirm: data.newPasswordConfirm,
			}
		});
        
		expect(result).rejects.toThrow(InvalidRequestError);
	});

	test("Should not update user password, because id is with type error", async () => {
		const data = makeBody(100, "Password1234", "Password12345", "Password12345");
		const { sut } = makeSut();

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				password: data.password,
				newPassword: data.newPassword,
				newPasswordConfirm: data.newPasswordConfirm,
			}
		});
        
		expect(result).rejects.toThrow(InvalidRequestError);
	});

	test("Should not update user password, because password is with type error", async () => {
		const data = makeBody("1", 100, "Password12345", "Password12345");
		const { sut } = makeSut();

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				password: data.password,
				newPassword: data.newPassword,
				newPasswordConfirm: data.newPasswordConfirm,
			}
		});
        
		expect(result).rejects.toThrow(InvalidRequestError);
	});

	test("Should not update user password, because new password is with type error", async () => {
		const data = makeBody("1", "Password1234", 100, "Password12345");
		const { sut } = makeSut();

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				password: data.password,
				newPassword: data.newPassword,
				newPasswordConfirm: data.newPasswordConfirm,
			}
		});
        
		expect(result).rejects.toThrow(InvalidRequestError);
	});

	test("Should not update user password, because new password confirm is with type error", async () => {
		const data = makeBody("1", "Password1234", "Password12345", 100);
		const { sut } = makeSut();

		const result = sut.http({ 
			userId: data.id as string,
			data: {
				password: data.password,
				newPassword: data.newPassword,
				newPasswordConfirm: data.newPasswordConfirm,
			}
		});
        
		expect(result).rejects.toThrow(InvalidRequestError);
	});

	test("Should update user password", async () => {
		const data = makeBody("1", "Password1234", "Password12345", "Password12345");
		const { sut } = makeSut();

		const result = await sut.http({ 
			userId: data.id as string,
			data: {
				password: data.password,
				newPassword: data.newPassword,
				newPasswordConfirm: data.newPasswordConfirm,
			}
		});
        
		expect(result).toEqual(HttpHelper.ok(data.id));
	});
});
