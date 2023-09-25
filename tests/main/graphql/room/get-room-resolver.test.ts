import { setup, loginGraphql } from "../../__mocks__";
import { setupGraphQL } from "@/main/graphql";
import request from "supertest";

const makeBodyGetRoom = (roomCode: unknown) => {
	return {
		roomCode
	};
};

describe("getRoom - QUERY", () => {

	setup();

	const query = "query GetRoom($data: GetRoomInput) { getRoom(data: $data) { id, userId, code, name } }";

	test("Should not get room, because code is invalid", async () => {
		const body = makeBodyGetRoom("000");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidRoomCodeError");
	});

	test("Should not get room, because room is not exists", async () => {
		const body = makeBodyGetRoom("000001");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

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
		const body = makeBodyGetRoom("000000");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
			
		expect(response.body.data.getRoom.id).toBe("10");
		expect(response.body.data.getRoom.userId).toBe("1");
		expect(response.body.data.getRoom.code).toBe("000000");
		expect(response.body.data.getRoom.name).toBe("room");
	});
});