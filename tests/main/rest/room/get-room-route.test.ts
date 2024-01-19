import { setup, loginRest } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

describe("/api/rooms/:roomCode - GET", () => {

	setup();

	test("Should not get room, because code is invalid", async () => {
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.get("/api/rooms/000")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRoomCodeError");
	});

	test("Should not get room, because room is not exists", async () => {
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.get("/api/rooms/000001")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(404);
		expect(response.body.code).toBe("NotFoundError");
	});

	test("Should get room", async () => {
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.get("/api/rooms/000000")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.id).toBe("10");
		expect(response.body.userId).toBe("1");
		expect(response.body.code).toBe("000000");
		expect(response.body.name).toBe("room");
	});
});