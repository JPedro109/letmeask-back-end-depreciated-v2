import { setup, loginRest } from "../../__mocks__";
import { setupRest } from "@/main/rest";
import request from "supertest";

describe("/api/questions - DELETE", () => {

	setup();

	test("Should not delete question, because question is not exists", async () => {
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.delete("/api/questions/0")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(404);
		expect(response.body.code).toBe("NotFoundError");
	});

	test("Should delete the question with room admin", async () => {
		const token = await loginRest("email_verified_and_with_room@test.com");

		const response = await request(setupRest())
			.delete("/api/questions/11")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.id).toBe("11");
		expect(response.body.question).toBe("question");
	});

	test("Should delete the question with question creator", async () => {
		const token = await loginRest("email_verified_code_expiry@test.com");

		const response = await request(setupRest())
			.delete("/api/questions/11")
			.set("authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.id).toBe("11");
		expect(response.body.question).toBe("question");
	});
});