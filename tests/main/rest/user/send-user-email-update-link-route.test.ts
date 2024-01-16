jest.setTimeout(10000);

import { loginRest, setup } from "../../__mocks__";
import { setupRest } from "@/main/rest";
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

		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.post("/api/users/send-email-update-link")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not send user email update link, because email is with type error", async () => {
		const body = makeBodySendUserEmailUpdateLink(100);

		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.post("/api/users/send-email-update-link")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not send user email update link, because email already is register", async () => {
		const body = makeBodySendUserEmailUpdateLink("email_verified_and_with_room@test.com");

		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.post("/api/users/send-email-update-link")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should send user email update link", async () => {
		const body = makeBodySendUserEmailUpdateLink("email@test.com");

		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.post("/api/users/send-email-update-link")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(body.email);
	});
});