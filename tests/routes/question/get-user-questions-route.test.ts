import { setup, login } from "../__mocks__";
import { setupExpress } from "@/main/express";
import request from "supertest";

describe("/api/questions - GET", () => {

	setup();

	test("Should get user questions", async () => {
		const token = await login("email_verified_code_expiry@test.com");
			
		const response = await request(setupExpress())
			.get("/api/questions")
			.set("authorization", `Bearer ${token}`);

		expect(response.body[0].id).toBe("11");
		expect(response.body[0].userId).toBe("2");
		expect(response.body[0].question).toBe("question");
		expect(response.body[1].id).toBe("13");
		expect(response.body[1].userId).toBe("2");
		expect(response.body[1].question).toBe("question-two");
	});
});