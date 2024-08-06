jest.setTimeout(10000);

import { setup } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

const makeBodySendUserPasswordRecoverylink = (email: unknown) => {
	return {
		email
	};
};

describe("sendUserPasswordRecoveryLink - MUTATION", () => {
    
	setup();

	const query = "mutation SendUserPasswordRecoveryLink($data: SendUserPasswordRecoveryLinkInput) { sendUserPasswordRecoveryLink(data: $data) }";

	test("Should not send user password recovery link, because email is empty", async () => {
		const body = makeBodySendUserPasswordRecoverylink("");
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not send user password recovery link, because email is not register", async () => {
		const body = makeBodySendUserPasswordRecoverylink("email_is_not_register@test.com");
        
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("NotFoundError");
	});

	test("Should send user password recovery link", async () => {
		const body = makeBodySendUserPasswordRecoverylink("email_verified_and_with_room@test.com");
       
		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.data.sendUserPasswordRecoveryLink).toBe(body.email);
	});
});