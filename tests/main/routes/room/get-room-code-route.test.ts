import { setup, loginRest } from "../../__mocks__";
import { setupRest } from "@/main/rest";
import request from "supertest";

describe("/api/rooms/exists/:roomCode - GET", () => {

	setup();

	test("Should not get true, because room is not exists", async () => {
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupRest())
			.get("/api/rooms/exists/000001")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(404);
		expect(response.body.code).toBe("NotFoundError");
	});
	
	test("Should get room", async () => {
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupRest())
			.get("/api/rooms/exists/000000")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe(true);
	});
});