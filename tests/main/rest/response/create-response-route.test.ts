import { setup, loginRest } from "../../__mocks__";
import { setupRest } from "@/main/rest";
import request from "supertest";

const makeBodyCreateResponse = (questionId: unknown, response: unknown) => {
	return {
		questionId,
		response,
	};
};

describe("/api/responses - POST", () => {

	setup();

	test("Should not create response, because question id field is empty", async () => {
		const body = makeBodyCreateResponse("", "response");

		const token = await loginRest("email_verified_and_with_room@test.com");
		const response = await request(setupRest())
			.post("/api/responses")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not create response, because response field is empty", async () => {
		const body = makeBodyCreateResponse("11", "");

		const token = await loginRest("email_verified_and_with_room@test.com");
		const response = await request(setupRest())
			.post("/api/responses")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not create response, because question id field with is type error", async () => {
		const body = makeBodyCreateResponse(100, "response");

		const token = await loginRest("email_verified_and_with_room@test.com");
		const response = await request(setupRest())
			.post("/api/responses")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not create response, because response field with is type error", async () => {
		const body = makeBodyCreateResponse("11", 100);

		const token = await loginRest("email_verified_and_with_room@test.com");
		const response = await request(setupRest())
			.post("/api/responses")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidRequestError");
	});

	test("Should not create response, because the question alredy is answered", async () => {
		const body = makeBodyCreateResponse("11", "response");

		const token = await loginRest("email_verified_and_with_room@test.com");
		const response = await request(setupRest())
			.post("/api/responses")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should not create response, because the user is not room admin", async () => {
		const body = makeBodyCreateResponse("11", "response");

		const token = await loginRest("email_verified_code_expiry@test.com");
		const response = await request(setupRest())
			.post("/api/responses")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should create response", async () => {
		const body = makeBodyCreateResponse("13", "response");

		const token = await loginRest("email_verified_and_with_room@test.com");
		const response = await request(setupRest())
			.post("/api/responses")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(201);
		expect(response.body.response).toBe("response");
	});
});