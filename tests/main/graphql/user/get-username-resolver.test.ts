jest.setTimeout(10000);

import { loginGraphql, setup } from "../../__mocks__";
import { setupGraphQL } from "@/main/graphql";
import request from "supertest";

describe("getUsername - QUERY", () => {
    
	setup();

	const query = "query GetUsername { getUsername }";

	test("Should get username", async () => {
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query
			});

		expect(response.body.data.getUsername).toBe("username");
	});
});