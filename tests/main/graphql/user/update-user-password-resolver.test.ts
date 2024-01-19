jest.setTimeout(10000);

import { loginGraphql, setup } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

const makeSutUpdateUserPassword = (password: unknown, newPassword: unknown, newPasswordConfirm: unknown) => {
	return {
		password,
		newPassword,
		newPasswordConfirm
	};
};

describe("updateUserPassword - MUTATION", () => {
    
	setup();

	const query = "mutation UpdateUserPassword($data: UpdateUserPasswordInput) { updateUserPassword(data: $data) }";

	test("Should not update user password, because password is empty", async () => {
		const body = makeSutUpdateUserPassword("", "Password12345", "Password12345");
       
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not update user password, because new password is empty", async () => {
		const body = makeSutUpdateUserPassword("Password1234", "", "Password12345");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not update user password, because new password confirm is empty", async () => {
		const body = makeSutUpdateUserPassword("Password1234", "Password12345", "");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not update user password, because password is not match with registered passwod in database", async () => {
		const body = makeSutUpdateUserPassword("password", "Password12345", "Password12345");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidParamError");
	});

	test("Should not update user password, because new is not respect password rules", async () => {
		const body = makeSutUpdateUserPassword("Password1234", "password", "password");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidUserPasswordError");
	});

	test("Should not update user password, because passwords is not match", async () => {
		const body = makeSutUpdateUserPassword("Password1234", "Password123456", "Password12345");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidParamError");
	});

	test("Should not update user password, because new password is match current password", async () => {
		const body = makeSutUpdateUserPassword("Password1234", "Password1234", "Password1234");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidParamError");
	});

	test("Should update user password", async () => {
		const body = makeSutUpdateUserPassword("Password1234", "Password12345", "Password12345");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
			
		expect(response.body.data.updateUserPassword).toBe("1");
	});
});