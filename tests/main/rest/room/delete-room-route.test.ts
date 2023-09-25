import { setup, loginRest } from "../../__mocks__";
import { setupRest } from "@/main/rest";
import request from "supertest";

describe("/api/rooms/:roomCode - Delete Room", () => {

	setup();

	test("Should not delete room, because room is not exists", async () => {
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.delete("/api/rooms/000001")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(404);
		expect(response.body.code).toBe("NotFoundError");
	});

	test("Should not delete room, because user is not the room admin", async () => {
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupRest())
			.delete("/api/rooms/000000")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should delete room", async () => {
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.delete("/api/rooms/000000")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.id).toBe("10");
		expect(response.body.userId).toBe("1");
		expect(response.body.code).toBe("000000");
		expect(response.body.name).toBe("room");
	});
});