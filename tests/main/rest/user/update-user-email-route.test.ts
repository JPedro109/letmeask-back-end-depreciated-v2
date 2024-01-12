jest.setTimeout(10000);

import { loginRest, setup } from "../../__mocks__";
import { setupRest } from "@/main/rest";
import request from "supertest";

const makeBodyUpdateUserEmail = (email: string, code: string) => {
	return {
		email,
		code
	};
};

describe("/api/users/email - PATCH", () => {

	setup();
    
	test("Should not update user email, because email is empty", async () => {
		const body = makeBodyUpdateUserEmail("", "code");
        
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.patch(`/api/users/email?email=${body.email}&code=${body.code}`)
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("RequestError");
	});

	test("Should not update user email, because email is invalid", async () => {
		const body = makeBodyUpdateUserEmail("invalid_email", "code");
        
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.patch(`/api/users/email?email=${body.email}&code=${body.code}`)
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("DomainError");
	});

	test("Should not update user email, because code is empty", async () => {
		const body = makeBodyUpdateUserEmail("email@test.com", "");
        
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.patch(`/api/users/email?email=${body.email}&code=${body.code}`)
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("RequestError");
	});

	test("Should not update user email, because code is invalid", async () => {
		const body = makeBodyUpdateUserEmail("email_verified_and_with_room@test.com", "code_invalid");
        
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.patch(`/api/users/email?email=${body.email}&code=${body.code}`)
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not recover user password, because code is expiried", async () => {
		const body = makeBodyUpdateUserEmail("email_verified_code_expiry@test.com", "email_code_expiry");
        
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupRest())
			.patch(`/api/users/email?email=${body.email}&code=${body.code}`)
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should update user email", async () => {
		const body = makeBodyUpdateUserEmail("email@test.com", "email_code");
        
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.patch(`/api/users/email?email=${body.email}&code=${body.code}`)
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe("1");
	});
});