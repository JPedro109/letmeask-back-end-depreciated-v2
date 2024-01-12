jest.setTimeout(10000);

import { loginRest, setup } from "../../__mocks__";
import { setupRest } from "@/main/rest";
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

		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.patch("/api/users/username")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("RequestError");
	});

	test("Should not update username, because username is with type error", async () => {
		const body = makeBodyUpdateUsername(100);

		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.patch("/api/users/username")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("RequestError");
	});

	test("Should not update username, because username is invalid", async () => {
		const body = makeBodyUpdateUsername("u".repeat(300));

		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.patch("/api/users/username")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("DomainError");
	});

	test("Should update username", async () => {
		const body = makeBodyUpdateUsername("username_two");

		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.patch("/api/users/username")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(body.username);
	});
});