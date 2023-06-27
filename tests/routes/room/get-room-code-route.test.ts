import { setup, login } from "../__mocks__";
import { setupExpress } from "@/main/express";
import request from "supertest";

describe("/api/rooms/exists/:roomCode - GET", () => {

	setup();

	test("Should not get true, because room is not exists", async () => {
		const token = await login("email_verified_code_expiry@test.com");

		const response = await request(setupExpress())
			.get("/api/rooms/exists/000001")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(404);
		expect(response.body.code).toBe("NotFoundError");
	});
	
	test("Should get room", async () => {
		const token = await login("email_verified_code_expiry@test.com");

		const response = await request(setupExpress())
			.get("/api/rooms/exists/000000")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(true);
	});
});