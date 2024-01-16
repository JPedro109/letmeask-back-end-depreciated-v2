jest.setTimeout(10000);

import { loginGraphql, setup } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

const makeBodyUpdateUserEmail = (email: string, code: string) => {
	return {
		email,
		code
	};
};

describe("updateUserEmail - MUTATION", () => {

	setup();

	const query = "mutation UpdateUserEmail($data: UpdateUserEmailInput) { updateUserEmail(data: $data) }";
    
	test("Should not update user email, because email is empty", async () => {
		const body = makeBodyUpdateUserEmail("", "code");
        
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

	test("Should not update user email, because email is invalid", async () => {
		const body = makeBodyUpdateUserEmail("invalid_email", "code");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("DomainError");
	});

	test("Should not update user email, because code is empty", async () => {
		const body = makeBodyUpdateUserEmail("email@test.com", "");
        
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

	test("Should not update user email, because code is invalid", async () => {
		const body = makeBodyUpdateUserEmail("email_verified_and_with_room@test.com", "code_invalid");
        
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

	test("Should not recover user password, because code is expiried", async () => {
		const body = makeBodyUpdateUserEmail("email_verified_code_expiry@test.com", "email_code_expiry");
        
		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidParamError");
	});

	test("Should update user email", async () => {
		const body = makeBodyUpdateUserEmail("email@test.com", "email_code");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.data.updateUserEmail).toBe("1");
	});
});