jest.setTimeout(10000);

import { setup } from "../__mocks__";
import { setupRest } from "@/main/rest";
import request from "supertest";

const makeBodySendUserPasswordRecoverylink = (email: unknown) => {
	return {
		email
	};
};

describe("/api/users/send-password-recovery-link - POST", () => {
    
	setup();

	test("Should not send user password recovery link, because email is empty", async () => {
		const body = makeBodySendUserPasswordRecoverylink("");
        
		const response = await request(setupRest())
			.post("/api/users/send-password-recovery-link")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not send user password recovery link, because email is with type error", async () => {
		const body = makeBodySendUserPasswordRecoverylink(100);
        
		const response = await request(setupRest())
			.post("/api/users/send-password-recovery-link")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidTypeError");
	});

	test("Should not send user password recovery link, because email is not register", async () => {
		const body = makeBodySendUserPasswordRecoverylink("email_is_not_register@test.com");
        
		const response = await request(setupRest())
			.post("/api/users/send-password-recovery-link")
			.send(body);

		expect(response.statusCode).toBe(404);
		expect(response.body.code).toBe("NotFoundError");
	});

	test("Should send user password recovery link", async () => {
		const body = makeBodySendUserPasswordRecoverylink("email_verified_and_with_room@test.com");
       
		const response = await request(setupRest())
			.post("/api/users/send-password-recovery-link")
			.send(body);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(body.email);
	});
});