import { setup, loginGraphql } from "../../__mocks__";
import { setupGraphQL } from "@/main/graphql";
import request from "supertest";

describe("getUserQuestions - QUERY", () => {

	setup();

	const query = "query GetUserQuestions { getUserQuestions { id, userId, question } }";


	test("Should get user questions", async () => {
		const token = await loginGraphql("email_verified_code_expiry@test.com");
			
		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query
			});

		expect(response.body.data.getUserQuestions[0].id).toBe("11");
		expect(response.body.data.getUserQuestions[0].userId).toBe("2");
		expect(response.body.data.getUserQuestions[0].question).toBe("question");
		expect(response.body.data.getUserQuestions[1].id).toBe("13");
		expect(response.body.data.getUserQuestions[1].userId).toBe("2");
		expect(response.body.data.getUserQuestions[1].question).toBe("question-two");
	});
});