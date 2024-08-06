import { setup, loginRest } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

describe("/api/rooms/managed-room - GET", () => {

	setup();

	test("Should get null", async () => {
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupServer())
			.get("/api/rooms/managed-room")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(null);
	});
	
	test("Should get room", async () => {
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.get("/api/rooms/managed-room")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe("000000");
	});
});