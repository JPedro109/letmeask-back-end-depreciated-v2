import { testRestSetup, loginRest } from "../../__mocks__";
import { setupRest } from "@/main/rest";
import request from "supertest";

describe("/api/rooms/managed-room - GET", () => {

	testRestSetup();

	test("Should get null", async () => {
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupRest())
			.get("/api/rooms/managed-room")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(null);
	});
	
	test("Should get room", async () => {
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.get("/api/rooms/managed-room")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe("000000");
	});
});