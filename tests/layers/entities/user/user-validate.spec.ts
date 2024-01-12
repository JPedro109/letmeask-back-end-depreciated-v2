import { UserValidate } from "@/layers/domain";

describe("Entity - UserValidate", () => {
    
	describe("email", () => {
		test("Should not create user email, because email is empty" , () => {
			const invalidUserEmail = "";
	
			const sut = UserValidate.email(invalidUserEmail);
	
			expect(sut.invalid).toBeTruthy();
		});
		
		test("Should not create user email, because email has more than 256 characters" , () => {
			const invalidUserEmail = "c".repeat(300);
	
			const sut = UserValidate.email(invalidUserEmail);
	
			expect(sut.invalid).toBeTruthy();
		});
	
		test("Should not create user email, because email is not respect regEx" , () => {
			const invalidUserEmail = "email.com";
					
			const sut = UserValidate.email(invalidUserEmail);
	
			expect(sut.invalid).toBeTruthy();
		});
	
		test("Should not create user email, because the email account has more than 64 characters" , () => {
			const invalidAccount = "c".repeat(100);
	
			const sut = UserValidate.email(`${invalidAccount}@test.com`);
	
			expect(sut.invalid).toBeTruthy();
		});
	
		test("Should not create user email, because the email domain has more than 64 characters" , () => {
			const invalidDomain = "c".repeat(300);
	
			const sut = UserValidate.email(`email@${invalidDomain}.com`);
	
			expect(sut.invalid).toBeTruthy();
		});
	
		test("Should create user email" , () => {
			const userEmail = "email@test.com";
			
			const sut = UserValidate.email(userEmail);
	
			expect(sut.invalid).toBeFalsy();
		});
	});

	describe("password", () => {
		test("Should not create user password, because password is empty" , () => {
			const invalidUserPassword = "";
	
			const sut = UserValidate.password(invalidUserPassword);
	
			expect(sut.invalid).toBeTruthy();
		});
	
		test("Should not create user password, because password is not respect regEx" , () => {
			const invalidUserPassword = "password";
	
			const sut = UserValidate.password(invalidUserPassword);
	
			expect(sut.invalid).toBeTruthy();
		});
	
		test("Should create user password" , () => {
			const userPassword = "Password1234";
	
			const sut = UserValidate.password(userPassword);
	
			expect(sut.invalid).toBeFalsy();
		});
	});

	describe("username", () => {
		test("Should not create username, because username is empty" , () => {
			const invalidUsername = "";
	
			const sut = UserValidate.username(invalidUsername);
	
			expect(sut.invalid).toBeTruthy();
		});
	
		test("Should not create username, because the username has more than 256 characters" , () => {
			const invalidUsername = "c".repeat(300);
	
			const sut = UserValidate.username(invalidUsername);
	
			expect(sut.invalid).toBeTruthy();
		});
	
		test("Should not create username, because the username has more than 256 characters" , () => {
			const username = "username";
	
			const sut = UserValidate.username(username);
	
			expect(sut.invalid).toBeFalsy();
		});
	});
});