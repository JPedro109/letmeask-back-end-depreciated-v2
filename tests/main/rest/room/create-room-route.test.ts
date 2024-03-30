import { setup, loginRest } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

const makeBodyCreateRoom = (roomName: unknown) => {
	return {
		roomName
	};
};

describe("/api/rooms - POST", () => {

	setup();

	test("Should not create room, because the room name is empty", async () => {
		const body = makeBodyCreateRoom("");
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupServer())
			.post("/api/rooms")
			.set("authorization", `Bearer ${token}`)
			.send(body);
		
		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not create room, because the room name with is type error", async () => {
		const body = makeBodyCreateRoom(100);
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupServer())
			.post("/api/rooms")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not create room, because user alredy created has a room", async () => {
		const body = makeBodyCreateRoom("room-two");
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/api/rooms")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should create room", async () => {
		const body = makeBodyCreateRoom("room-two");
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupServer())
			.post("/api/rooms")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(201);
		expect(response.body.userId).toBe("2");
		expect(response.body.name).toBe(body.roomName);
	});
});