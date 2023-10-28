import { DatabaseSQLHelper, RoomRepositoryAdapter, MockRepository } from "@/layers/external";

describe("External - RoomRepositoryAdapter", () => {
    
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

	test("Should create room | store", async () => {
		const sut = new RoomRepositoryAdapter(databaseSQLHelper);

		const room = await sut.createRoom("111111", "room", "5");

		expect(room.code).toBe("111111");
		expect(room.name).toBe("room");
		expect(room.userId).toBe("5");
	});

	test("Should get room | getRoomByCode", async () => {
		const sut = new RoomRepositoryAdapter(databaseSQLHelper);

		const room = await sut.getRoomByCode("000000");

		expect(room.code).toBe("000000");
		expect(room.name).toBe("Room");
		expect(room.userId).toBe("4");
	});

	test("Should get null | getRoomByCode", async () => {
		const sut = new RoomRepositoryAdapter(databaseSQLHelper);

		const room = await sut.getRoomByCode("000001");

		expect(room).toBe(null);
	});

	test("Should get room | getRoomByUserId", async () => {
		const sut = new RoomRepositoryAdapter(databaseSQLHelper);

		const room = await sut.getRoomByUserId("4");

		expect(room.code).toBe("000000");
		expect(room.name).toBe("Room");
		expect(room.userId).toBe("4");
	});

	test("Should get null | getByUserID", async () => {
		const sut = new RoomRepositoryAdapter(databaseSQLHelper);

		const room = await sut.getRoomByUserId("5");

		expect(room).toBe(null);
	});

	test("Should get true | roomExists", async () => {
		const sut = new RoomRepositoryAdapter(databaseSQLHelper);

		const room = await sut.roomExists("000000");

		expect(room).toBe(true);
	});

	test("Should get false | roomExists", async () => {
		const sut = new RoomRepositoryAdapter(databaseSQLHelper);

		const room = await sut.roomExists("000001");

		expect(room).toBe(false);
	});

	test("Should get code | getCodeByUserId", async () => {
		const sut = new RoomRepositoryAdapter(databaseSQLHelper);

		const room = await sut.getCodeByUserId("4");

		expect(room).toBe("000000");
	});

	test("Should get code | getCodeByUserId", async () => {
		const sut = new RoomRepositoryAdapter(databaseSQLHelper);

		const room = await sut.getCodeByUserId("12345");

		expect(room).toBe(null);
	});

	test("Should delete room | deleteByRoomCode", async () => {
		const sut = new RoomRepositoryAdapter(databaseSQLHelper);

		const room = await sut.deleteRoomByCode("000000");

		expect(room.code).toBe("000000");
		expect(room.name).toBe("Room");
		expect(room.userId).toBe("4");
	});
});