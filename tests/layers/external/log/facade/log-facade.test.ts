import { LogBashAdapter, LogNoSQLAdapter, LogRepositoryAdapter } from "@/layers/external";
import { LogFacade } from "@/layers/external/log";

describe("External - LogFacade", () => {
    
	test("Should return true | trace", () => {
		const title = "TEST";
		const message = "{\"name\":\"test\"}";
		const trace = "0000000000";
		const logBashAdapter = new LogBashAdapter();
		const logNoSQLAdapter = new LogNoSQLAdapter(new LogRepositoryAdapter());
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "trace");

		const result = sut.trace(title, message, trace);

		expect(result).toBeTruthy();
		expect(sut.trace).toHaveBeenCalled();
		expect(sut.trace).toHaveBeenCalledWith(title, message, trace);
	});

	test("Should return true | info", () => {
		const title = "TEST";
		const message = "{\"name\":\"test\"}";
		const logBashAdapter = new LogBashAdapter();
		const logNoSQLAdapter = new LogNoSQLAdapter(new LogRepositoryAdapter());
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "info");

		const result = sut.info(title, message);

		expect(result).toBeTruthy();
		expect(sut.info).toHaveBeenCalled();
		expect(sut.info).toHaveBeenCalledWith(title, message);
	});

	test("Should return true | warning", () => {
		const title = "TEST";
		const message = "{\"name\":\"test\"}";
		const logBashAdapter = new LogBashAdapter();
		const logNoSQLAdapter = new LogNoSQLAdapter(new LogRepositoryAdapter());
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "warning");

		const result = sut.warning(title, message);

		expect(result).toBeTruthy();
		expect(sut.warning).toHaveBeenCalled();
		expect(sut.warning).toHaveBeenCalledWith(title, message);
	});

	test("Should return true | error", () => {
		const title = "TEST";
		const message = "{\"name\":\"test\"}";
		const logBashAdapter = new LogBashAdapter();
		const logNoSQLAdapter = new LogNoSQLAdapter(new LogRepositoryAdapter());
		const sut = new LogFacade(logBashAdapter, logNoSQLAdapter);
		jest.spyOn(sut, "error");

		const result = sut.error(title, message);

		expect(result).toBeTruthy();
		expect(sut.error).toHaveBeenCalled();
		expect(sut.error).toHaveBeenCalledWith(title, message);
	});
});