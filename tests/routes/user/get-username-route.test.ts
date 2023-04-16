jest.setTimeout(10000);

import { login, setup } from "../__mocks__";
import { app } from "@/main/app";
import request from "supertest";

describe("/api/users/username - PATCH", () => {
    
	setup();

	test("Should get username", async () => {
		const token = await login("email_verified_and_with_room@test.com");

		const response = await request(app)
			.get("/api/users/username")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBe("username");
	});
});