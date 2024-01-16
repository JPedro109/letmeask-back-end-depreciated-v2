jest.setTimeout(10000);

import { setup } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

const makeBodyRecoverUserPassword = (email: string, code: string, password: unknown, passwordConfirm: unknown) => {
	return {
		email,
		code,
		password,
		passwordConfirm
	};
};

describe("recoverUserPassword - MUTATION", () => {
    
	setup();

	const query = "mutation RecoverUserPassword($data: RecoverUserPasswordInput) { recoverUserPassword(data: $data) }";

	test("Should not recover user password, because email is empty", async () => {
		const body = makeBodyRecoverUserPassword("", "code", "Password1234", "Password1234");
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not recover user password, because code is empty", async () => {
		const body = makeBodyRecoverUserPassword("email@test.com", "", "Password1234", "Password1234");
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});


		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not recover user password, because password is empty", async () => {
		const body = makeBodyRecoverUserPassword("email@test.com", "code", "", "Password1234");
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});


		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not recover user password, because password confirm is empty", async () => {
		const body = makeBodyRecoverUserPassword("email@test.com", "code", "Password1234", "");
       
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});


		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not recover user password, because user is not exists", async () => {
		const body = makeBodyRecoverUserPassword("email_is_not_exists@test.com", "password_code", "Password1234", "Password1234");
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("NotFoundError");
	});

	test("Should not recover user password, because code is invalid", async () => {
		const body = makeBodyRecoverUserPassword(
			"email_verified_and_with_room@test.com", 
			"code_invalid", 
			"Password1234", 
			"Password1234"
		);
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});


		expect(response.body.errors[0].code).toBe("InvalidParamError");
	});

	test("Should not recover user password, because code is expiried", async () => {
		const body = makeBodyRecoverUserPassword("email_verified_code_expiry@test.com", "password_code_expiry", "Password1234", "Password1234");
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});


		expect(response.body.errors[0].code).toBe("InvalidParamError");
	});

	test("Should not recover user password, because passwords is not match", async () => {
		const body = makeBodyRecoverUserPassword("email_verified_and_with_room@test.com", "password_code", "Password12345", "Password1234");
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});


		expect(response.body.errors[0].code).toBe("InvalidParamError");
	});

	test("Should not recover user password, because passwords is not respect password rules", async () => {
		const body = makeBodyRecoverUserPassword("email_verified_and_with_room@test.com", "password_code", "password", "password");
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});


		expect(response.body.errors[0].code).toBe("DomainError");
	});

	test("Should not recover user password, because new password is match current password", async () => {
		const body = makeBodyRecoverUserPassword("email_verified_and_with_room@test.com", "password_code", "Password1234", "Password1234");
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});


		expect(response.body.errors[0].code).toBe("InvalidParamError");
	});

	test("Should recover user password", async () => {
		const body = makeBodyRecoverUserPassword(
			"email_verified_and_with_room@test.com", 
			"password_code", 
			"Password12345", 
			"Password12345"
		);
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.data.recoverUserPassword).toBe(body.email);
	});

});