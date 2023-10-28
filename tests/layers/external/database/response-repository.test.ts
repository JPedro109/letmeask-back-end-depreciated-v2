import { ResponseRepositoryAdapter, DatabaseSQLHelper, MockRepository } from "@/layers/external";

describe("External - ResponseRepositoryAdapter", () => {
    
	const databaseSQLHelper = new DatabaseSQLHelper();
	
	beforeAll(async () => {
		await databaseSQLHelper.connect();
	});

	afterAll(async () => {
		await databaseSQLHelper.disconnect();
	});
    
	beforeEach(async () => {
		const mockRepository = new MockRepository(databaseSQLHelper);
		await mockRepository.createMocksToTestRepositories();
	});

	afterEach(async () => {
		const mockRepository = new MockRepository(databaseSQLHelper);
		await mockRepository.deleteMocks();
	});

	test("Should create response | store", async () => {
		const sut = new ResponseRepositoryAdapter(databaseSQLHelper);

		const room = await sut.createResponse("9", "response");

		expect(room.questionId).toBe("9");
		expect(room.response).toBe("response");
	});

});