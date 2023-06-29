jest.setTimeout(10000);

import { loginRest, setup } from "../__mocks__";
import { setupRest } from "@/main/rest";
import request from "supertest";

describe("/api/users/username - PATCH", () => {
    
	setup();

	test("Should get username", async () => {
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.get("/api/users/username")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe("username");
	});
});