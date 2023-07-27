import { DatabaseSQLHelper, QueueHelper, MockRepository } from "@/layers/external";
import { setupRest } from "@/main/rest";
import { setupGraphQL } from "@/main/graphql";

import request from "supertest";

export const setup = () => {
	const mockRepository = new MockRepository();

	beforeAll(async () => {
		await DatabaseSQLHelper.connect();
		await QueueHelper.connect();
	});

	afterAll(async () => {
		await DatabaseSQLHelper.disconnect();
		await QueueHelper.disconnect();
	});
    
	beforeEach(async () => {
		await mockRepository.createMocksToTestRoutes();
	});

	afterEach(async () => {
		await mockRepository.deleteMocks();
	});

};

export const loginRest = async (email: string) => {
	return (await request(setupRest())
		.post("/api/users/login")
		.send({
			email,
			password: "Password1234"
		})).body;
};


export const loginGraphql = async (email: string) => {
	return (await request(setupGraphQL())
		.post("/graphql")
		.send({
			query: "mutation UserLogin($data: UserLoginInput) { userLogin(data: $data) }",
			variables: { data: {
				email,
				password: "Password1234"
			} },
		})).body.data.userLogin;
};