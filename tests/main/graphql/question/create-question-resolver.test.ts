import { setup, loginGraphql } from "../../__mocks__";
import { setupGraphQL } from "@/main/graphql";
import request from "supertest";

const makeBodyCreateQuestion = (roomCode: unknown, question: unknown) => {
	return {
		roomCode,
		question
	};
};

describe("createQuestion - MUTATION", () => {

	setup();

	const query = "mutation CreateQuestion($data: CreateQuestionInput) { createQuestion(data: $data) { question } }";

	test("Should not create question, because room code field is empty", async () => {
		const body = makeBodyCreateQuestion("", "question");

		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
			
		expect(response.body.errors[0].code).toBe("MissingParamError");
	});

	test("Should not create question, because question field is empty", async () => {
		const body = makeBodyCreateQuestion("000000", "");

		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("MissingParamError");
	});

	test("Should not create question, because room is not exists", async () => {
		const body = makeBodyCreateQuestion("000001", "question");

		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("NotFoundError");
	});

	test("Should not create question, because the user is room admin", async () => {
		const body = makeBodyCreateQuestion("000000", "question");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("UnauthorizedError");
	});

	test("Should create question", async () => {
		const body = makeBodyCreateQuestion("000000", "question");

		const token = await loginGraphql("email_verified_code_expiry@test.com");
		
		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.data.createQuestion.question).toBe("question");
	});
});