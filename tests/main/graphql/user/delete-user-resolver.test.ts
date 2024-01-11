jest.setTimeout(10000);

import { setup, loginGraphql } from "../../__mocks__";
import { setupGraphQL } from "@/main/graphql";
import request from "supertest";

const makeBody = (password: unknown, passwordConfirm: unknown) => {
	return {
		password,
		passwordConfirm
	};
};

describe("deleteUser - MUTATION", () => {

	setup();
    
	const query = "mutation DeleteUser($data: DeleteUserInput) { deleteUser(data: $data) }";

	test("Should not delete user, because password is empty", async () => {
		const body = makeBody("", "Password1234");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
			
		expect(response.body.errors[0].code).toBe("RequestError");
	});

	test("Should not delete user, because passwordConfirm is empty", async () => {
		const body = makeBody("Password1234", "");

		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
		expect(response.body.errors[0].code).toBe("RequestError");
	});

	test("Should not delete user, because passwords is not match", async () => {
		const body = makeBody("Password1234", "Password12345");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
		expect(response.body.errors[0].code).toBe("InvalidParamError");
	
	});

	test("Should not delete user, because password is invalid", async () => {
		const body = makeBody("password", "password");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
		expect(response.body.errors[0].code).toBe("InvalidParamError");
	
	});

	test("Should delete user", async () => {
		const body = makeBody("Password1234", "Password1234");
        
		const token = await loginGraphql("email_verified_and_with_room@test.com");

		const response = await request(setupGraphQL())
			.post("/graphql")
			.set("authorization", `Bearer ${token}`)
			.send({
				query,
				variables: { data: body },
			});
		expect(response.body.data.deleteUser).toBe("1");
	});
});