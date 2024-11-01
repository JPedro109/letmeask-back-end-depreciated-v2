import { UserEntity, DomainError, InvalidUserEmailError, InvalidUserPasswordError, InvalidUsernameError } from "@/layers/domain";

describe(("Entity - User"), () => {
    
	test("Should not create user, because user email is not valid" , () => {
		const invalidUserEmail = "email.com";
		const username = "username";
		const password = "Password1234";

		const sut = () => UserEntity.create({
			email: invalidUserEmail, 
			username: username, 
			password,
			verifiedEmail: true
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should not create user, because username is not valid" , () => {
		const userEmail = "email@test.com";
		const invalidUsername = "";
		const password = "password";

		const sut = () => UserEntity.create({
			email: userEmail, 
			username: invalidUsername, 
			password,
			verifiedEmail: true
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should not create user, because user password is not valid" , () => {
		const email = "email@test.com";
		const username = "username";
		const invalidUserPassword = "password";

		const sut = () => UserEntity.create({
			email: email, 
			username: username, 
			password: invalidUserPassword,
			verifiedEmail: true
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should create user" , () => {
		const userEmail = "email@test.com";
		const username = "username";
		const userPassword = "Password1234";

		const sut = UserEntity.create({
			email: userEmail, 
			username: username, 
			password: userPassword,
			verifiedEmail: true
		});

		expect(sut).toBeInstanceOf(UserEntity);
	});

	test("Should not update email, because email is invalid" , () => {
		const userEmail = "email@test.com";
		const username = "username";
		const userPassword = "Password1234";
		const user = UserEntity.create({
			email: userEmail, 
			username: username, 
			password: userPassword,
			verifiedEmail: true
		});

		const sut = () => user.email = "";

		expect(sut).toThrow(InvalidUserEmailError);
	});


	test("Should update email" , () => {
		const userEmail = "email@test.com";
		const username = "username";
		const userPassword = "Password1234";
		const user = UserEntity.create({
			email: userEmail, 
			username: username, 
			password: userPassword,
			verifiedEmail: true
		});

		user.email = "email2@test.com";

		expect(user.email).toBe("email2@test.com");
	});

	test("Should not update username, because username is invalid" , () => {
		const userEmail = "email@test.com";
		const username = "username";
		const userPassword = "Password1234";
		const user = UserEntity.create({
			email: userEmail, 
			username: username, 
			password: userPassword,
			verifiedEmail: true
		});

		const sut = () => user.username = "";

		expect(sut).toThrow(InvalidUsernameError);
	});

	test("Should update username" , () => {
		const userEmail = "email@test.com";
		const username = "username";
		const userPassword = "Password1234";
		const user = UserEntity.create({
			email: userEmail, 
			username: username, 
			password: userPassword,
			verifiedEmail: true
		});

		user.username = "username 2";

		expect(user.username).toBe("username 2");
	});

	test("Should not update password, because password is invalid" , () => {
		const userEmail = "email@test.com";
		const username = "username";
		const userPassword = "Password1234";
		const user = UserEntity.create({
			email: userEmail, 
			username: username, 
			password: userPassword,
			verifiedEmail: true
		});

		const sut = () => user.password = "";

		expect(sut).toThrow(InvalidUserPasswordError);
	});

	test("Should update password" , () => {
		const userEmail = "email@test.com";
		const username = "username";
		const userPassword = "Password1234";
		const user = UserEntity.create({
			email: userEmail, 
			username: username, 
			password: userPassword,
			verifiedEmail: true
		});

		user.password = "Password12345";

		expect(user.password).toBe("Password12345");
	});

	test("Should not update verified email, because verified email already is true" , () => {
		const userEmail = "email@test.com";
		const username = "username";
		const userPassword = "Password1234";
		const user = UserEntity.create({
			email: userEmail, 
			username: username, 
			password: userPassword,
			verifiedEmail: true
		});

		const sut = () => user.verifiedEmail = true;

		expect(sut).toThrow(DomainError);
	});

	test("Should update verified email" , () => {
		const userEmail = "email@test.com";
		const username = "username";
		const userPassword = "Password1234";
		const user = UserEntity.create({
			email: userEmail, 
			username: username, 
			password: userPassword,
			verifiedEmail: false
		});

		user.verifiedEmail = true;

		expect(user.verifiedEmail).toBeTruthy();
	});
});