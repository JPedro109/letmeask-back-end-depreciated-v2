jest.setTimeout(10000);

import { setup } from "../__mocks__";
import { app } from "@/main/app";
import request from "supertest";

const makeBodyCreateUser = (email: unknown, username: unknown, password: unknown, passwordConfirm: unknown) => {
	return {
		email,
		username,
		password,
		passwordConfirm
	};
};

describe("/api/users - POST", () => {

	setup();
    
	test("Should not create user, because email is empty", async () => {
		const body = makeBodyCreateUser("", "username", "Password1234", "Password1234");
        
		const response = await request(app)
			.post("/api/users")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not create user, because username is empty", async () => {
		const body = makeBodyCreateUser("email@test.com", "", "Password1234", "Password1234");
        
		const response = await request(app)
			.post("/api/users")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});


	test("Should not create user, because password is empty", async () => {
		const body = makeBodyCreateUser("email@test.com", "username", "", "Password1234");

		const response = await request(app)
			.post("/api/users")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not create user, because passwordConfirm is empty", async () => {
		const body = makeBodyCreateUser("email@test.com", "username", "Password1234", "");

		const response = await request(app)
			.post("/api/users")
			.send(body);
			
		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not create user, because email is with type error", async () => {
		const body = makeBodyCreateUser(100, "username", "Password1234", "Password1234");
        
		const response = await request(app)
			.post("/api/users")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidTypeError");
	});

	test("Should not create user, because username is with type error", async () => {
		const body = makeBodyCreateUser("email@test.com", 100, "Password1234", "Password1234");
        
		const response = await request(app)
			.post("/api/users")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidTypeError");
	});

	test("Should not create user, because password is with type error", async () => {
		const body = makeBodyCreateUser("email@test.com", "username", 100, "Password1234");

		const response = await request(app)
			.post("/api/users")
			.send(body);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidTypeError");
	});

	test("Should not create user, because passwordConfirm is with type error", async () => {
		const body = makeBodyCreateUser("email@test.com", "username", "Password1234", 100);

		const response = await request(app)
			.post("/api/users")
			.send(body);
			
		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidTypeError");
	});

	test("Should not create user, because email is invalid", async () => {
		const body = makeBodyCreateUser("email.com", "username", "Password1234", "Password1234");

		const response = await request(app)
			.post("/api/users")
			.send(body);
		
		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidEmailError");
	});

	test("Should not create user, because username is invalid", async () => {
		const body = makeBodyCreateUser("email@test.com", "u".repeat(300), "Password1234", "Password1234");

		const response = await request(app)
			.post("/api/users")
			.send(body);
		
		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidUsernameError");
	});

	test("Should not create user, because email already is register", async () => {
		const body = makeBodyCreateUser("email_verified_and_with_room@test.com", "username", "Password1234", "Password1234");

		const response = await request(app)
			.post("/api/users")
			.send(body);
		
		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not create user, because password is not respect rules", async () => {
		const body = makeBodyCreateUser("email@test.com", "username", "password", "password");

		const response = await request(app)
			.post("/api/users")
			.send(body);
		
		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidPasswordError");
	});

	test("Should not create user, because passwords is not match", async () => {
		const body = makeBodyCreateUser("email@test.com", "username", "Password1234", "Password12345");

		const response = await request(app)
			.post("/api/users")
			.send(body);
		
		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should create user", async () => {
		const body = makeBodyCreateUser("email@test.com", "username", "Password1234", "Password1234");

		const response = await request(app)
			.post("/api/users")
			.send(body);
		
		expect(response.statusCode).toBe(201);
		expect(response.body).toBe(body.email);
	});
});