import { LogAdapter } from "@/layers/external/log";

describe("External - LogAdapter", () => {
    
	test("Should return true | trace", () => {
		const title = "TEST";
		const log = "log";
		const trace = "0000000000";
		const sut = new LogAdapter();
		jest.spyOn(sut, "trace");

		const result = sut.trace(title, log, trace);

		expect(result).toBeTruthy();
		expect(sut.trace).toHaveBeenCalled();
		expect(sut.trace).toHaveBeenCalledWith(title, log, trace);
	});

	test("Should return true | info", () => {
		const title = "TEST";
		const log = "log";
		const sut = new LogAdapter();
		jest.spyOn(sut, "info");

		const result = sut.info(title, log);

		expect(result).toBeTruthy();
		expect(sut.info).toHaveBeenCalled();
		expect(sut.info).toHaveBeenCalledWith(title, log);
	});

	test("Should return true | warning", () => {
		const title = "TEST";
		const log = "log";
		const sut = new LogAdapter();
		jest.spyOn(sut, "warning");

		const result = sut.warning(title, log);

		expect(result).toBeTruthy();
		expect(sut.warning).toHaveBeenCalled();
		expect(sut.warning).toHaveBeenCalledWith(title, log);
	});

	test("Should return true | error", () => {
		const title = "TEST";
		const log = "log";
		const sut = new LogAdapter();
		jest.spyOn(sut, "error");

		const result = sut.error(title, log);

		expect(result).toBeTruthy();
		expect(sut.error).toHaveBeenCalled();
		expect(sut.error).toHaveBeenCalledWith(title, log);
	});
});