import { setup, loginRest } from "../__mocks__";
import { setupRest } from "@/main/rest";
import request from "supertest";

describe("/api/questions - GET", () => {

	setup();

	test("Should get user questions", async () => {
		const token = await loginRest("email_verified_code_expiry@test.com");
			
		const response = await request(setupRest())
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