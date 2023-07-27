import { setup, loginGraphql } from "../../__mocks__";
import { setupGraphQL } from "@/main/graphql";
import request from "supertest";

const makeBodyCreateResponse = (questionId: unknown, response: unknown) => {
	return {
		questionId,
		response,
	};
};

describe("createResponse - MUTATION", () => {

	setup();

	const query = "mutation CreateResponse($data: CreateResponseInput) { createResponse(data: $data) { response } }";

	test("Should not create response, because question id field is empty", async () => {
		const body = makeBodyCreateResponse("", "response");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("MissingParamError");
	});

	test("Should not create response, because response field is empty", async () => {
		const body = makeBodyCreateResponse("11", "");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("MissingParamError");
	});

	test("Should not create response, because the question alredy is answered", async () => {
		const body = makeBodyCreateResponse("11", "response");

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

	test("Should not create response, because the user is not room admin", async () => {
		const body = makeBodyCreateResponse("11", "response");

		const token = await loginGraphql("email_verified_code_expiry@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("UnauthorizedError");
	});

	test("Should create response", async () => {
		const body = makeBodyCreateResponse("13", "response");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.data.createResponse.response).toBe("response");
	});
});