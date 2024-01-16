jest.setTimeout(10000);

import { setup } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

const makeBody = (email: unknown, password: unknown) => {
	return {
		email,
		password
	};
};

describe("/api/users/login - POST", () => {
    
	setup();

	test("Should not login user, because email is empty", async () => {
		const body = makeBody("", "Password1234");

		const response = await request(setupServer())
			.post("/api/users/login")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not login user, because password is empty", async () => {
		const body = makeBody("email@test.com", "");

		const response = await request(setupServer())
			.post("/api/users/login")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not login user, because email is with type error", async () => {
		const body = makeBody(100, "Password1234");

		const response = await request(setupServer())
			.post("/api/users/login")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not login user, because password is with type error", async () => {
		const body = makeBody("email@test.com", 100);

		const response = await request(setupServer())
			.post("/api/users/login")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not login user, because email is incorrect", async () => {
		const body = makeBody("email_is_not_exists@.com", "Password1234");

		const response = await request(setupServer())
			.post("/api/users/login")
			.send(body);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should not login user, because password is incorrect", async () => {
		const body = makeBody("email_verified@.com", "Password12345");

		const response = await request(setupServer())
			.post("/api/users/login")
			.send(body);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should not login user, because email is not verified", async () => {
		const body = makeBody("email_is_not_verified@.com", "Password1234");

		const response = await request(setupServer())
			.post("/api/users/login")
			.send(body);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should login user", async () => {
		const body = makeBody("email_verified_and_with_room@test.com", "Password1234");

		const response = await request(setupServer())
			.post("/api/users/login")
			.send(body);

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("string");
	});
});