import { UserPassword, InvalidUserPasswordError } from "@/layers/domain";

describe(("Object Value - UserPassword"), () => {
    
	test("Should not create user password, because password is empty" , () => {
		const invalidUserPassword = "";

		const sut = UserPassword.create(invalidUserPassword);

		expect(sut).toBeInstanceOf(InvalidUserPasswordError);
	});

	test("Should not create user password, because password is not respect regEx" , () => {
		const invalidUserPassword = "password";

		const sut = UserPassword.create(invalidUserPassword);

		expect(sut).toBeInstanceOf(InvalidUserPasswordError);
	});

	test("Should create user password" , () => {
		const userPassword = "Password1234";

		const sut = UserPassword.create(userPassword);

		if(!(sut instanceof Error)) expect(sut.value).toBe(userPassword);
		expect(sut).toBeInstanceOf(UserPassword);
	});
});