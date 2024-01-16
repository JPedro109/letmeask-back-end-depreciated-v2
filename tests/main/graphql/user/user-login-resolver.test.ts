jest.setTimeout(10000);

import { setup } from "../../__mocks__";
import { setupServer } from "@/main/server";
import request from "supertest";

const makeBody = (email: unknown, password: unknown) => {
	return {
		email,
		password
	};
};

describe("userLogin - MUTATION", () => {
    
	setup();

	const query = "mutation UserLogin($data: UserLoginInput) { userLogin(data: $data) }";

	test("Should not login user, because email is empty", async () => {
		const body = makeBody("", "Password1234");

		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not login user, because password is empty", async () => {
		const body = makeBody("email@test.com", "");

		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("InvalidRequestError");
	});

	test("Should not login user, because email is incorrect", async () => {
		const body = makeBody("email_is_not_exists@.com", "Password1234");

		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("UnauthorizedError");
	});

	test("Should not login user, because password is incorrect", async () => {
		const body = makeBody("email_verified@.com", "Password12345");

		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("UnauthorizedError");
	});

	test("Should not login user, because email is not verified", async () => {
		const body = makeBody("email_is_not_verified@.com", "Password1234");

		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("UnauthorizedError");
	});

	test("Should login user", async () => {
		const body = makeBody("email_verified_and_with_room@test.com", "Password1234");

		const response = await request(setupServer())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(typeof response.body.data.userLogin).toBe("string");
	});
});