import { User, InvalidUserEmailError, InvalidUserPasswordError, InvalidUsernameError } from "@/layers/domain";

describe(("Entity - User"), () => {
    
	test("Should not create user, because user email is not valid" , () => {
		const invalidUserEmail = "email.com";
		const username = "username";
		const password = "Password1234";

		const sut = User.create(invalidUserEmail, username, password);

		expect(sut).toBeInstanceOf(InvalidUserEmailError);
	});

	test("Should not create user, because username is not valid" , () => {
		const userEmail = "email@test.com";
		const invalidUsername = "";
		const password = "password";

		const sut = User.create(userEmail, invalidUsername, password);

		expect(sut).toBeInstanceOf(InvalidUsernameError);
	});

	test("Should not create user, because user password is not valid" , () => {
		const email = "email@test.com";
		const username = "username";
		const invalidUserPassword = "password";

		const sut = User.create(email, username, invalidUserPassword);

		expect(sut).toBeInstanceOf(InvalidUserPasswordError);
	});

	test("Should create user" , () => {
		const userEmail = "email@test.com";
		const username = "username";
		const userPassword = "Password1234";

		const sut = User.create(userEmail, username, userPassword);

		expect(sut).toBeInstanceOf(User);
	});
});