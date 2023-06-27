import { setup, login } from "../__mocks__";
import { setupExpress } from "@/main/express";
import request from "supertest";

describe("/api/rooms/managed-room - GET", () => {

	setup();

	test("Should get null", async () => {
		const token = await login("email_verified_code_expiry@test.com");

		const response = await request(setupExpress())
			.get("/api/rooms/managed-room")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(null);
	});
	
	test("Should get room", async () => {
		const token = await login("email_verified_and_with_room@test.com");

		const response = await request(setupExpress())
			.get("/api/rooms/managed-room")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe("000000");
	});
});