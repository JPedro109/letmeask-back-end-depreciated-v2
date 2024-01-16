import { setup, loginGraphql } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

describe("getUserRoomCode - QUERY", () => {

	setup();

	const query = "query GetRoom { getUserRoomCode }";

	test("Should get null", async () => {
		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query
			});

		expect(response.body.data.getUserRoomCode).toBe(null);
	});
	
	test("Should get room", async () => {
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query
			});

		expect(response.body.data.getUserRoomCode).toBe("000000");
	});
});