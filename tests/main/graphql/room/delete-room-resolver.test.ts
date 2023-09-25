import { setup, loginGraphql } from "../../__mocks__";
import { setupGraphQL } from "@/main/graphql";
import request from "supertest";

const makeBodyDeleteRoom = (roomCode: unknown) => {
	return {
		roomCode
	};
};

describe("deleteRoom - MUTATION", () => {

	setup();

	const query = "mutation DeleteRoom($data: DeleteRoomInput) { deleteRoom(data: $data) { id, userId, code, name } }";

	test("Should not delete room, because room is not exists", async () => {
		const body = makeBodyDeleteRoom("000001");

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

	test("Should not delete room, because user is not the room admin", async () => {
		const body = makeBodyDeleteRoom("000000");

		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("UnauthorizedError");
	});

	test("Should delete room", async () => {
		const body = makeBodyDeleteRoom("000000");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
			
		expect(response.body.data.deleteRoom.id).toBe("10");
		expect(response.body.data.deleteRoom.userId).toBe("1");
		expect(response.body.data.deleteRoom.code).toBe("000000");
		expect(response.body.data.deleteRoom.name).toBe("room");
	});
});