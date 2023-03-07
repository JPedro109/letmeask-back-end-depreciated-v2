jest.setTimeout(10000);

import { login, setup } from "../__mocks__";
import { app } from "@/main/app";
import request from "supertest";

const makeBodySendUserEmailUpdateLink = (email: unknown) => {
	return {
		email
	};
};

describe("/api/users/send-email-update-link - POST", () => {
    
	setup();

	test("Should not send user email update link, because email is empty", async () => {
		const body = makeBodySendUserEmailUpdateLink("");

		const token = await login("email_verified_and_with_room@test.com");

		const response = await request(app)
			.post("/api/users/send-email-update-link")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not send user email update link, because email is with type error", async () => {
		const body = makeBodySendUserEmailUpdateLink(100);

		const token = await login("email_verified_and_with_room@test.com");

		const response = await request(app)
			.post("/api/users/send-email-update-link")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidTypeError");
	});

	test("Should not send user email update link, because email is invalid", async () => {
		const body = makeBodySendUserEmailUpdateLink("email.com");

		const token = await login("email_verified_and_with_room@test.com");

		const response = await request(app)
			.post("/api/users/send-email-update-link")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidEmailError");
	});

	test("Should not send user email update link, because email already is register", async () => {
		const body = makeBodySendUserEmailUpdateLink("email_verified_and_with_room@test.com");

		const token = await login("email_verified_and_with_room@test.com");

		const response = await request(app)
			.post("/api/users/send-email-update-link")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should send user email update link", async () => {
		const body = makeBodySendUserEmailUpdateLink("email@test.com");

		const token = await login("email_verified_and_with_room@test.com");

		const response = await request(app)
			.post("/api/users/send-email-update-link")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(body.email);
	});
});