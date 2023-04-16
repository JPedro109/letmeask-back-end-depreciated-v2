jest.setTimeout(10000);

import { setup } from "../__mocks__";
import { app } from "@/main/app";
import request from "supertest";

const makeBodyVerifyEmailUser = (id: string, code: string) => {
	return {
		id,
		code
	};
};

describe("/api/users/verify-email - PATCH", () => {
    
	setup();

	test("Should not verify email user, because email is empty", async () => {
		const body = makeBodyVerifyEmailUser("", "code");

		const response = await request(app)
			.patch(`/api/users/verify-email?email=${body.id}&code=${body.code}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not verify email user, because code is empty", async () => {
		const body = makeBodyVerifyEmailUser("email_not_verified@test.com", "");

		const response = await request(app)
			.patch(`/api/users/verify-email?email=${body.id}&code=${body.code}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not verify email user, because code is incorrect", async () => {
		const body = makeBodyVerifyEmailUser("email_not_verified@test.com", "invalid_code");

		const response = await request(app)
			.patch(`/api/users/verify-email?email=${body.id}&code=${body.code}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not verify email user, because email already is verified", async () => {
		const body = makeBodyVerifyEmailUser("email_verified_and_with_room@test.com", "code");

		const response = await request(app)
			.patch(`/api/users/verify-email?email=${body.id}&code=${body.code}`)
			.send(body);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should verify email user", async () => {
		const body = makeBodyVerifyEmailUser("email_not_verified@test.com", "email_verification_code");

		const response = await request(app)
			.patch(`/api/users/verify-email?email=${body.id}&code=${body.code}`)
			.send(body);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(body.id);
	});
});