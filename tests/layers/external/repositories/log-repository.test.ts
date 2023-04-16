import { DatabaseNoSQLHelper, LogRepositoryAdapter } from "@/layers/external";

describe("External - LogRepositoryAdapter", () => {
    
	beforeAll(async () => {
		await DatabaseNoSQLHelper.connect();
	});

	afterAll(async () => {
		await DatabaseNoSQLHelper.getCollection("logletmeask").deleteMany({});
		await DatabaseNoSQLHelper.disconnect();
	});
    
	test("Should create verification code | createLog", async () => {
		const message = "message";
		const stack = "stack";
		const name = "name";
		const sut = new LogRepositoryAdapter();

		const log = await sut.createLog(message, stack, name);

		expect(log.message).toBe(message);
		expect(log.stack).toBe(stack);
		expect(log.name).toBe(name);
	});

});