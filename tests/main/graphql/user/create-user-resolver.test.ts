jest.setTimeout(10000);

import { setup } from "../../__mocks__";
import { setupGraphQL } from "@/main/graphql";
import request from "supertest";

const makeBodyCreateUser = (email: unknown, username: unknown, password: unknown, passwordConfirm: unknown) => {
	return {
		email,
		username,
		password,
		passwordConfirm
	};
};

describe("createUser - MUTATION", () => {

	setup();

	const query = "mutation CreateUser($data: CreateUserInput) { createUser(data: $data) }";
    
	test("Should not create user, because email is empty", async () => {
		const body = makeBodyCreateUser("", "username", "Password1234", "Password1234");
        
		const response = await request(setupGraphQL())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("MissingParamError");
	});

	test("Should not create user, because username is empty", async () => {
		const body = makeBodyCreateUser("email@test.com", "", "Password1234", "Password1234");
        
		const response = await request(setupGraphQL())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("MissingParamError");
	});

	test("Should not create user, because password is empty", async () => {
		const body = makeBodyCreateUser("email@test.com", "username", "", "Password1234");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});

		expect(response.body.errors[0].code).toBe("MissingParamError");
	});

	test("Should not create user, because email is invalid", async () => {
		const body = makeBodyCreateUser("email.com", "username", "Password1234", "Password1234");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});
		
		expect(response.body.errors[0].code).toBe("InvalidUserEmailError");
	});

	test("Should not create user, because username is invalid", async () => {
		const body = makeBodyCreateUser("email@test.com", "u".repeat(300), "Password1234", "Password1234");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});
		
		expect(response.body.errors[0].code).toBe("InvalidUsernameError");
	});

	test("Should not create user, because email already is register", async () => {
		const body = makeBodyCreateUser("email_verified_and_with_room@test.com", "username", "Password1234", "Password1234");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});
		
		expect(response.body.errors[0].code).toBe("InvalidParamError");
	});

	test("Should not create user, because password is not respect rules", async () => {
		const body = makeBodyCreateUser("email@test.com", "username", "password", "password");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});
		
		expect(response.body.errors[0].code).toBe("InvalidUserPasswordError");
	});

	test("Should not create user, because passwords is not match", async () => {
		const body = makeBodyCreateUser("email@test.com", "username", "Password1234", "Password12345");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});
		
		expect(response.body.errors[0].code).toBe("InvalidParamError");
	});

	test("Should create user", async () => {
		const body = makeBodyCreateUser("email@test.com", "username", "Password1234", "Password1234");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.send({
				query,
				variables: { data: body },
			});
		
		expect(response.body.data.createUser).toBe(body.email);
	});
});