import { User, InvalidEmailError, InvalidPasswordError, InvalidUsernameError } from "@/layers/entities";

describe(("Entity - User"), () => {
    
	test("Should not create user, because email is not valid" , () => {
		const invalidEmail = "email.com";
		const username = "username";
		const password = "Password1234";

		const sut = User.create(invalidEmail, username, password);

		expect(sut).toBeInstanceOf(InvalidEmailError);
	});

	test("Should not create user, because username is not valid" , () => {
		const email = "email@test.com";
		const invalidUsername = "";
		const password = "password";

		const sut = User.create(email, invalidUsername, password);

		expect(sut).toBeInstanceOf(InvalidUsernameError);
	});

	test("Should not create user, because password is not valid" , () => {
		const email = "email@test.com";
		const username = "username";
		const invalidPassword = "password";

		const sut = User.create(email, username, invalidPassword);

		expect(sut).toBeInstanceOf(InvalidPasswordError);
	});

	test("Should create user" , () => {
		const email = "email@test.com";
		const username = "username";
		const password = "Password1234";

		const sut = User.create(email, username, password);

		expect(sut).toBeInstanceOf(User);
	});
});