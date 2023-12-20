import { DatabaseNoSQLHelper, LogBashAdapter, LogNoSQLAdapter, LogRepositoryAdapter, SecretsAdapter } from "@/layers/external";
import { LogFacade } from "@/layers/external/log";

describe("External - LogFacade", () => {
    
	const secretsAdapter = new SecretsAdapter();
	const logRepository = new LogRepositoryAdapter(new DatabaseNoSQLHelper(secretsAdapter));
	const logBashAdapter = new LogBashAdapter();
	
	test("Should return true | trace", () => {
		process.env["LOG_NOSQL"] = "true";
		process.env["LOG_BASH"] = "true";
		const title = "TEST";
		const message = "{\"name\":\"test\"}";
		const trace = "0000000000";
		const logNoSQLAdapter = new LogNoSQLAdapter(logRepository, logBashAdapter);
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "trace");

		const result = sut.trace(title, message, trace);

		expect(result).toBeTruthy();
		expect(sut.trace).toHaveBeenCalled();
		expect(sut.trace).toHaveBeenCalledWith(title, message, trace);
	});

	test("Should return true | info", () => {
		process.env["LOG_NOSQL"] = "true";
		process.env["LOG_BASH"] = "true";
		const title = "TEST";
		const message = "{\"name\":\"test\"}";
		const logNoSQLAdapter = new LogNoSQLAdapter(logRepository, logBashAdapter);
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "info");

		const result = sut.info(title, message);

		expect(result).toBeTruthy();
		expect(sut.info).toHaveBeenCalled();
		expect(sut.info).toHaveBeenCalledWith(title, message);
	});

	test("Should return true | warning", () => {
		process.env["LOG_NOSQL"] = "true";
		process.env["LOG_BASH"] = "true";
		const title = "TEST";
		const message = "{\"name\":\"test\"}";
		const logNoSQLAdapter = new LogNoSQLAdapter(logRepository, logBashAdapter);
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "warning");

		const result = sut.warning(title, message);

		expect(result).toBeTruthy();
		expect(sut.warning).toHaveBeenCalled();
		expect(sut.warning).toHaveBeenCalledWith(title, message);
	});

	test("Should return true | error", () => {
		process.env["LOG_NOSQL"] = "true";
		process.env["LOG_BASH"] = "true";
		const title = "TEST";
		const message = "{\"name\":\"test\"}";
		const logNoSQLAdapter = new LogNoSQLAdapter(logRepository, logBashAdapter);
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "error");

		const result = sut.error(title, message);

		expect(result).toBeTruthy();
		expect(sut.error).toHaveBeenCalled();
		expect(sut.error).toHaveBeenCalledWith(title, message);
	});
});