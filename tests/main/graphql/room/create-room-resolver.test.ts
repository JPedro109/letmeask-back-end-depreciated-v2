import { setup, loginGraphql } from "../../__mocks__";
import { setupGraphQL } from "@/main/graphql";
import request from "supertest";

const makeBodyCreateRoom = (roomName: unknown) => {
	return {
		roomName
	};
};

describe("createRoom - MUTATION", () => {

	setup();

	const query = "mutation CreateRoom($data: CreateRoomInput) { createRoom(data: $data) { userId, name } }";

	test("Should not create room, because the room name is empty", async () => {
		const body = makeBodyCreateRoom("");

		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});		

		expect(response.body.errors[0].code).toBe("MissingParamError");
	});

	test("Should not create room, because user alredy created has a room", async () => {
		const body = makeBodyCreateRoom("room-two");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("UnauthorizedError");
	});

	test("Should create room", async () => {
		const body = makeBodyCreateRoom("room-two");
		
		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
			
		expect(response.body.data.createRoom.userId).toBe("2");
		expect(response.body.data.createRoom.name).toBe(body.roomName);
	});
});