import { CacheAdapter } from "@/layers/external";

describe("External - CryptographyAdapter", () => {
    
	test("Should return true | set", () => {
		const key = "key";
		const value = "value";
		const sut = new CacheAdapter();
		jest.spyOn(sut, "set");

		sut.set(key, value);

		expect(sut.set).toHaveBeenCalled();
		expect(sut.set).toHaveBeenCalledWith(key, value);
	});

	test("Should return value | get", () => {
		const key = "key";
		const value = "value";
		const sut = new CacheAdapter();
		jest.spyOn(sut, "get");

		sut.set(key, value);
		const result = sut.get(key);

		expect(result).toBe(value);
		expect(sut.get).toHaveBeenCalled();
		expect(sut.get).toHaveBeenCalledWith(key);
	});

	test("Should return value | del", () => {
		const key = "key";
		const value = "value";
		const sut = new CacheAdapter();
		jest.spyOn(sut, "del");

		sut.set(key, value);
		sut.del(key);
		const result = sut.get(key);

		expect(result).toBeUndefined();
		expect(sut.del).toHaveBeenCalled();
		expect(sut.del).toHaveBeenCalledWith(key);
	});
});