import { UserVerificationCodeRepositoryAdapter, DatabaseSQLHelper, MockRepository } from "@/layers/external";

describe("External - UserVerificationCodeRepositoryAdapter", () => {
    
	beforeAll(async () => {
		await DatabaseSQLHelper.connect();
	});

	afterAll(async () => {
		await DatabaseSQLHelper.disconnect();
	});
    
	beforeEach(async () => {
		const mockRepository = new MockRepository();
		await mockRepository.createMocksToTestRepositories();
	});

	afterEach(async () => {
		const mockRepository = new MockRepository();
		await mockRepository.deleteMocks();
	});

	test("Should create verification code | createUserVerificationCode", async () => {
		const sut = new UserVerificationCodeRepositoryAdapter();

		const verificationCode = await sut.createUserVerificationCode("code_random", 0, false, "4");

		expect(verificationCode.verificationCode).toBe("code_random");
		expect(verificationCode.verificationCodeExpiryDate).toBe(0);
	});

	test("Should invalid verification code | createUserVerificationCode", async () => {
		const sut = new UserVerificationCodeRepositoryAdapter();

		const verificationCode = await sut.invalidateUserValidationCode("repository_code_one");

		expect(verificationCode.verificationCode).toBe("repository_code_one");
		expect(verificationCode.verificationCodeExpiryDate).toBe(0);
	});
});