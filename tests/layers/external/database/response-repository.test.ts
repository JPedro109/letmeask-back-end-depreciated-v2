import { ResponseRepositoryAdapter, DatabaseSQLHelper, MockRepository } from "@/layers/external";

describe("External - ResponseRepositoryAdapter", () => {
    
	beforeAll(async () => {
		await DatabaseSQLHelper.connect();
	});

	afterAll(async () => {
		await DatabaseSQLHelper.disconnect();
	});
    
	beforeEach(async () => {
		const mockRepository = new MockRepository();
		await mockRepository.createMocksToTestRepositories();
	});

	afterEach(async () => {
		const mockRepository = new MockRepository();
		await mockRepository.deleteMocks();
	});

	test("Should create response | store", async () => {
		const sut = new ResponseRepositoryAdapter();

		const room = await sut.createResponse("9", "response");

		expect(room.questionId).toBe("9");
		expect(room.response).toBe("response");
	});

});