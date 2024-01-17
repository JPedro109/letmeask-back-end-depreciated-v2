import { DatabaseNoSQLHelper, LogRepositoryAdapter, SecretsAdapter } from "@/layers/external";
import { LogBashAdapter, LogNoSQLAdapter } from "@/layers/external";

describe("External - LogNoSQLAdapter", () => {

	const secretsAdapter = new SecretsAdapter();
	const logRepository = new LogRepositoryAdapter(new DatabaseNoSQLHelper(secretsAdapter));
	const logBashAdapter = new LogBashAdapter();

	test("Should return true but the insertation will fail | trace", () => {
		const message = "{\"name\":\"test\"}";
		const trace = "0000000000";
		const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
		jest.spyOn(sut, "trace");
		jest
			.spyOn(logRepository, "createLog")
			.mockReturnValueOnce(Promise.reject(new Error("TEST")));

		const result = sut.trace(message, trace);

		expect(result).toBeTruthy();
		expect(sut.trace).toHaveBeenCalled();
		expect(sut.trace).toHaveBeenCalledWith(message, trace);
	});

	test("Should return true | trace", () => {
		const message = "{\"name\":\"test\"}";
		const trace = "0000000000";
		const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
		jest.spyOn(sut, "trace");
		jest
			.spyOn(logRepository, "createLog")
			.mockReturnValueOnce(Promise.reject(new Error("TEST")));

		const result = sut.trace(message, trace);

		expect(result).toBeTruthy();
		expect(sut.trace).toHaveBeenCalled();
		expect(sut.trace).toHaveBeenCalledWith(message, trace);
	});

	test("Should return true but the insertation will fail | log", () => {
		const message = "{\"name\":\"test\"}";
		const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
		jest.spyOn(sut, "info");
		jest
			.spyOn(logRepository, "createLog")
			.mockReturnValueOnce(Promise.reject(new Error("TEST")));

		const result = sut.info(message);

		expect(result).toBeTruthy();
		expect(sut.info).toHaveBeenCalled();
		expect(sut.info).toHaveBeenCalledWith(message);
	});

	test("Should return true | log", () => {
		const message = "{\"name\":\"test\"}";
		const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
		jest.spyOn(sut, "info");

		const result = sut.info(message);

		expect(result).toBeTruthy();
		expect(sut.info).toHaveBeenCalled();
		expect(sut.info).toHaveBeenCalledWith(message);
	});

	test("Should return true but the insertation will fail | warn", () => {
		const message = "{\"name\":\"test\"}";
		const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
		jest.spyOn(sut, "warning");
		jest
			.spyOn(logRepository, "createLog")
			.mockReturnValueOnce(Promise.reject(new Error("TEST")));

		const result = sut.warning(message);

		expect(result).toBeTruthy();
		expect(sut.warning).toHaveBeenCalled();
		expect(sut.warning).toHaveBeenCalledWith(message);
	});

	test("Should return true | warn", () => {
		const message = "{\"name\":\"test\"}";
		const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
		jest.spyOn(sut, "warning");

		const result = sut.warning(message);

		expect(result).toBeTruthy();
		expect(sut.warning).toHaveBeenCalled();
		expect(sut.warning).toHaveBeenCalledWith(message);
	});

	test("Should return true but the insertation will fail | error", () => {
		const message = "{\"name\":\"test\"}";
		const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
		jest.spyOn(sut, "error");
		jest
			.spyOn(logRepository, "createLog")
			.mockReturnValueOnce(Promise.reject(new Error("TEST")));

		const result = sut.error(message, new Error());

		expect(result).toBeTruthy();
		expect(sut.error).toHaveBeenCalled();
		expect(sut.error).toHaveBeenCalledWith(message, new Error());
	});

	test("Should return true | error", () => {
		const message = "{\"name\":\"test\"}";
		const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
		jest.spyOn(sut, "error");

		const result = sut.error(message, new Error());

		expect(result).toBeTruthy();
		expect(sut.error).toHaveBeenCalled();
		expect(sut.error).toHaveBeenCalledWith(message, new Error());
	});
});