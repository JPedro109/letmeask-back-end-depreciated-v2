import { DatabaseNoSQLHelper, LogRepositoryAdapter, SecretsAdapter } from "@/layers/external";

describe("External - LogRepositoryAdapter", () => {
    
	const databaseNoSQLHelper = new DatabaseNoSQLHelper(new SecretsAdapter());

	beforeAll(async () => {
		await databaseNoSQLHelper.connect();
	});

	afterAll(async () => {
		await databaseNoSQLHelper.getCollection("letmeask-logs", "log").deleteMany({});
		await databaseNoSQLHelper.disconnect();
	});
    
	test("Should create the log | createLog", async () => {
		const level = "[INFO]";
		const message = "{\"name\":\"test\"}";
		const sut = new LogRepositoryAdapter(databaseNoSQLHelper);

		const log = await sut.createLog(level, message);

		expect(log.level).toBe(level);
		expect(log.message).toBe(message);
	});

});