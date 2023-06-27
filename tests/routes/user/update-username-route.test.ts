jest.setTimeout(10000);

import { login, setup } from "../__mocks__";
import { setupExpress } from "@/main/express";
import request from "supertest";

const makeBodyUpdateUsername = (username: unknown) => {
	return {
		username
	};
};

describe("/api/users/username - PATCH", () => {
    
	setup();

	test("Should not update username, because username is empty", async () => {
		const body = makeBodyUpdateUsername("");

		const token = await login("email_verified_and_with_room@test.com");

		const response = await request(setupExpress())
			.patch("/api/users/username")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not update username, because username is with type error", async () => {
		const body = makeBodyUpdateUsername(100);

		const token = await login("email_verified_and_with_room@test.com");

		const response = await request(setupExpress())
			.patch("/api/users/username")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidTypeError");
	});

	test("Should not update username, because username is invalid", async () => {
		const body = makeBodyUpdateUsername("u".repeat(300));

		const token = await login("email_verified_and_with_room@test.com");

		const response = await request(setupExpress())
			.patch("/api/users/username")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidUsernameError");
	});

	test("Should update username", async () => {
		const body = makeBodyUpdateUsername("username_two");

		const token = await login("email_verified_and_with_room@test.com");

		const response = await request(setupExpress())
			.patch("/api/users/username")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(body.username);
	});
});