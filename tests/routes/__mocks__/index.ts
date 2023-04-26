import { DatabaseSQLHelper, QueueHelper, MockRepository } from "@/layers/external";
import { app } from "@/main/app";

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

export const login = async (email: string) => {
	return (await request(app)
		.post("/api/users/login")
		.send({
			email,
			password: "Password1234"
		})).body;
};