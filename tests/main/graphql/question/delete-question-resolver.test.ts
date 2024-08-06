import { setup, loginGraphql } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

const makeBodyDeleteQuestion = (questionId: unknown) => {
	return {
		questionId
	};
};


describe("deleteQuestion - MUTATION", () => {

	setup();

	const query = "mutation DeleteQuestion($data: DeleteQuestionInput) { deleteQuestion(data: $data) { id, question } }";

	test("Should not delete question, because question is not exists", async () => {
		const body = makeBodyDeleteQuestion("0");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("NotFoundError");
	});

	test("Should delete the question with room admin", async () => {
		const body = makeBodyDeleteQuestion("11");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.data.deleteQuestion.id).toBe("11");
		expect(response.body.data.deleteQuestion.question).toBe("question");
	});

	test("Should delete the question with question creator", async () => {
		const body = makeBodyDeleteQuestion("11");

		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupServer())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
			
		expect(response.body.data.deleteQuestion.id).toBe("11");
		expect(response.body.data.deleteQuestion.question).toBe("question");
	});
});