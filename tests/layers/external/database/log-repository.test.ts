import { DatabaseNoSQLHelper, LogRepositoryAdapter } from "@/layers/external";

describe("External - LogRepositoryAdapter", () => {
    
	beforeAll(async () => {
		await DatabaseNoSQLHelper.connect();
	});

	afterAll(async () => {
		await DatabaseNoSQLHelper.getCollection("logletmeask").deleteMany({});
		await DatabaseNoSQLHelper.disconnect();
	});
    
	test("Should create the log | createLog", async () => {
		const level = "[INFO]";
		const title = "title";
		const message = "{\"name\":\"test\"}";
		const sut = new LogRepositoryAdapter();

		const log = await sut.createLog(level, title, message);

		expect(log.level).toBe(level);
		expect(log.title).toBe(title);
		expect(log.message).toBe(message);
	});

});