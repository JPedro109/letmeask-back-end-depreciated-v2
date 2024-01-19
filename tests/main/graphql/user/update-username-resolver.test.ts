jest.setTimeout(10000);

import { loginGraphql, setup } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

const makeBodyUpdateUsername = (username: unknown) => {
	return {
		username
	};
};

describe("updateUsername - MUTATION", () => {
    
	setup();

	const query = "mutation UpdateUsername($data: UpdateUsernameInput) { updateUsername(data: $data) }";

	test("Should not update username, because username is empty", async () => {
		const body = makeBodyUpdateUsername("");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not update username, because username is invalid", async () => {
		const body = makeBodyUpdateUsername("u".repeat(300));

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidUsernameError");
	});

	test("Should update username", async () => {
		const body = makeBodyUpdateUsername("username_two");

		const token = await loginGraphql("email_verified_and_with_room@test.com");


		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
			
		expect(response.body.data.updateUsername).toBe(body.username);
	});
});