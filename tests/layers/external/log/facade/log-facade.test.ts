import { DatabaseNoSQLHelper, LogBashAdapter, LogNoSQLAdapter, LogRepositoryAdapter, SecretsAdapter } from "@/layers/external";
import { LogFacade } from "@/layers/external/log";

describe("External - LogFacade", () => {
    
	const secretsAdapter = new SecretsAdapter();
	
	test("Should throw error | instantiation", () => {
		delete process.env["LOG_NOSQL"];
		delete process.env["LOG_BASH"];
		let error: Error | null = null;
		const logBashAdapter = new LogBashAdapter();
		const logNoSQLAdapter = new LogNoSQLAdapter(new LogRepositoryAdapter(new DatabaseNoSQLHelper(secretsAdapter)));
		const sut = LogFacade;

		try {
			new sut(logBashAdapter, logNoSQLAdapter, secretsAdapter);
		} catch(e) {
			error = e;
		}

		expect(error).toBeInstanceOf(Error);
	});
	
	test("Should return true | trace", () => {
		process.env["LOG_NOSQL"] = "true";
		process.env["LOG_BASH"] = "true";
		const title = "TEST";
		const message = "{\"name\":\"test\"}";
		const trace = "0000000000";
		const logBashAdapter = new LogBashAdapter();
		const logNoSQLAdapter = new LogNoSQLAdapter(new LogRepositoryAdapter(new DatabaseNoSQLHelper(secretsAdapter)));
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter, secretsAdapter);
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
		const logBashAdapter = new LogBashAdapter();
		const logNoSQLAdapter = new LogNoSQLAdapter(new LogRepositoryAdapter(new DatabaseNoSQLHelper(secretsAdapter)));
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter, secretsAdapter);
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
		const logBashAdapter = new LogBashAdapter();
		const logNoSQLAdapter = new LogNoSQLAdapter(new LogRepositoryAdapter(new DatabaseNoSQLHelper(secretsAdapter)));
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter, secretsAdapter);
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
		const logBashAdapter = new LogBashAdapter();
		const logNoSQLAdapter = new LogNoSQLAdapter(new LogRepositoryAdapter(new DatabaseNoSQLHelper(secretsAdapter)));
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter, secretsAdapter);
		jest.spyOn(sut, "error");

		const result = sut.error(title, message);

		expect(result).toBeTruthy();
		expect(sut.error).toHaveBeenCalled();
		expect(sut.error).toHaveBeenCalledWith(title, message);
	});
});