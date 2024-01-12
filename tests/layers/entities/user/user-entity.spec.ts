import { UserEntity } from "@/layers/domain";

describe("Entity - UserEntity", () => {
    
	test("Should not create user, because user email, password and username are not valid" , () => {
		const email = "email.com";
		const username = "u".repeat(300);
		const password = "pass";

		const sut = UserEntity.validate(email, username, password);

		expect(sut.invalid).toBeTruthy();
	});

	test("Should create user" , () => {
		const email = "email@test.com";
		const username = "username";
		const password = "Password1234";

		const sut = UserEntity.validate(email, username, password);

		expect(sut.invalid).toBeFalsy();
	});
});