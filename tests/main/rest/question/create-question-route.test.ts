import { setup, loginRest } from "../../__mocks__";
import { setupRest } from "@/main/rest";
import request from "supertest";

const makeBodyCreateQuestion = (roomCode: unknown, question: unknown) => {
	return {
		roomCode,
		question
	};
};

describe("/api/questions - POST", () => {

	setup();

	test("Should not create question, because room code field is empty", async () => {
		const body = makeBodyCreateQuestion("", "question");
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupRest())
			.post("/api/questions")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not create question, because question field is empty", async () => {
		const body = makeBodyCreateQuestion("000000", "");
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupRest())
			.post("/api/questions")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not create question, because room code field is with type error", async () => {
		const body = makeBodyCreateQuestion(100, "question");
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupRest())
			.post("/api/questions")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidTypeError");
	});

	test("Should not create question, because question field is with type error", async () => {
		const body = makeBodyCreateQuestion("000000", 100);
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupRest())
			.post("/api/questions")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidTypeError");
	});

	test("Should not create question, because room is not exists", async () => {
		const body = makeBodyCreateQuestion("000001", "question");

		const token = await loginRest("email_verified_code_expiry@test.com");
		const response = await request(setupRest())
			.post("/api/questions")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(404);
		expect(response.body.code).toBe("NotFoundError");
	});

	test("Should not create question, because the user is room admin", async () => {
		const body = makeBodyCreateQuestion("000000", "question");
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.post("/api/questions")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should create question", async () => {
		const body = makeBodyCreateQuestion("000000", "question");

		const token = await loginRest("email_verified_code_expiry@test.com");
		const response = await request(setupRest())
			.post("/api/questions")
			.set("authorization", `Bearer ${token}`)
			.send(body);

		expect(response.statusCode).toBe(201);
		expect(response.body.question).toBe("question");
	});
});