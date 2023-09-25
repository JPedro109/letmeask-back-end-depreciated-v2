import { setup, loginGraphql } from "../../__mocks__";
import { setupGraphQL } from "@/main/graphql";
import request from "supertest";

const makeBodyGetRoomCode = (roomCode: unknown) => {
	return {
		roomCode
	};
};

describe("getRoomCode - QUERY", () => {

	setup();

	const query = "query GetRoomCode($data: GetRoomCodeInput) { getRoomCode(data: $data) }";

	test("Should not get true, because room is not exists", async () => {
		const body = makeBodyGetRoomCode("000001");

		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
			
		expect(response.body.errors[0].code).toBe("NotFoundError");
	});
	
	test("Should get room", async () => {
		const body = makeBodyGetRoomCode("000000");

		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
			
		expect(response.body.data.getRoomCode).toBe(true);
	});
});