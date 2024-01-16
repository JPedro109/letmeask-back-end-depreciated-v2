jest.setTimeout(10000);

import { loginGraphql, setup } from "../../__mocks__";
import { setupGraphQL } from "@/main/graphql";
import request from "supertest";

const makeBodySendUserEmailUpdateLink = (email: unknown) => {
	return {
		email
	};
};

describe("sendUserEmailUpdateLink - MUTATION", () => {
    
	setup();

	const query = "mutation SendUserEmailUpdateLink($data: SendUserEmailUpdateLinkInput) { sendUserEmailUpdateLink(data: $data) }";

	test("Should not send user email update link, because email is empty", async () => {
		const body = makeBodySendUserEmailUpdateLink("");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not send user email update link, because email already is register", async () => {
		const body = makeBodySendUserEmailUpdateLink("email_verified_and_with_room@test.com");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidParamError");
	});

	test("Should send user email update link", async () => {
		const body = makeBodySendUserEmailUpdateLink("email@test.com");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
			
		expect(response.body.data.sendUserEmailUpdateLink).toBe(body.email);
	});
});