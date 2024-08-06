import { DatabaseNoSQLHelper, LogBashAdapter, LogNoSQLAdapter, LogRepositoryAdapter, SecretsAdapter } from "@/layers/external";
import { LogFacade } from "@/layers/external/log";

describe("External - LogFacade", () => {
    
	const secretsAdapter = new SecretsAdapter();
	const logRepository = new LogRepositoryAdapter(new DatabaseNoSQLHelper(secretsAdapter));
	const logBashAdapter = new LogBashAdapter();
	
	test("Should return true | trace", () => {
		const message = "{\"name\":\"test\"}";
		const trace = "0000000000";
		const logNoSQLAdapter = new LogNoSQLAdapter(logRepository, logBashAdapter);
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "trace");

		const result = sut.trace(message, trace);

		expect(result).toBeTruthy();
		expect(sut.trace).toHaveBeenCalled();
		expect(sut.trace).toHaveBeenCalledWith(message, trace);
	});

	test("Should return true | info", () => {
		const message = "{\"name\":\"test\"}";
		const logNoSQLAdapter = new LogNoSQLAdapter(logRepository, logBashAdapter);
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "info");

		const result = sut.info(message);

		expect(result).toBeTruthy();
		expect(sut.info).toHaveBeenCalled();
		expect(sut.info).toHaveBeenCalledWith(message);
	});

	test("Should return true | warning", () => {
		const message = "{\"name\":\"test\"}";
		const logNoSQLAdapter = new LogNoSQLAdapter(logRepository, logBashAdapter);
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "warning");

		const result = sut.warning(message);

		expect(result).toBeTruthy();
		expect(sut.warning).toHaveBeenCalled();
		expect(sut.warning).toHaveBeenCalledWith(message);
	});

	test("Should return true | error", () => {
		const message = "{\"name\":\"test\"}";
		const logNoSQLAdapter = new LogNoSQLAdapter(logRepository, logBashAdapter);
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "error");

		const result = sut.error(message, new Error());

		expect(result).toBeTruthy();
		expect(sut.error).toHaveBeenCalled();
		expect(sut.error).toHaveBeenCalledWith(message, new Error());
	});
});