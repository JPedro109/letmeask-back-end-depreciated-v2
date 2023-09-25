import { UserRepositoryAdapter, DatabaseSQLHelper, MockRepository } from "@/layers/external";

describe("External - UserRepositoryAdapterAdapter", () => {
    
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

	test("Should create user | store", async () => {
		const email = "email_repository@test.com";
		const username = "username";
		const hashPassword = "hash_password";
		const sut = new UserRepositoryAdapter();

		const result = await sut.createUser(email, username, hashPassword);

		expect(result.email).toBe(email);
	});

	test("Should get null | getUserById", async () => {
		const id = "0";
		const sut = new UserRepositoryAdapter();

		const result = await sut.getUserById(id);

		expect(result).toBe(null);
	});

	test("Should get user | getUserById", async () => {
		const id = "4";
		const sut = new UserRepositoryAdapter();

		const result = await sut.getUserById(id);

		expect(result.id).toBe(id);
	});

	test("Should get null | getUserByIdWithVerificationCode", async () => {
		const id = "0";
		const sut = new UserRepositoryAdapter();

		const result = await sut.getUserByIdWithVerificationCode(id, "code", false);

		expect(result).toBe(null);
	});

	test("Should get user | getUserByIdWithVerificationCode", async () => {
		const id = "4";
		const sut = new UserRepositoryAdapter();

		const result = await sut.getUserByIdWithVerificationCode(id, "repository_code_one", false);

		expect(result.id).toBe(id);
		expect(result.userVerificationCode).not.toBe(null);
	});

	test("Should get null | getUserByEmail", async () => {
		const email = "email_not_exists@test.com";
		const sut = new UserRepositoryAdapter();

		const result = await sut.getUserByEmail(email);

		expect(result).toBe(null);
	});

	test("Should get user | getUserByEmail", async () => {
		const email = "email@test.com";
		const sut = new UserRepositoryAdapter();

		const result = await sut.getUserByEmail(email);

		expect(result.email).toBe(email);
	});

	test("Should get null | getUserByEmailWithVerificationCode", async () => {
		const email = "email_not_exists@test.com";
		const sut = new UserRepositoryAdapter();

		const result = await sut.getUserByEmailWithVerificationCode(email, "code", false);

		expect(result).toBe(null);
	});

	test("Should get user | getUserByEmailWithVerificationCode", async () => {
		const email = "email@test.com";
		const sut = new UserRepositoryAdapter();

		const result = await sut.getUserByEmailWithVerificationCode(email, "repository_code_one", false);

		expect(result.email).toBe(email);
		expect(result.userVerificationCode).not.toBe(null);
	});

	test("Should update user | updateUserById", async () => {
		const id = "4";
		const username = "username_two";
		const password = "hash_password_two";
		const sut = new UserRepositoryAdapter();

		const result = await sut.updateUserById(id, { password, username });

		expect(result.password).toBe(password);
		expect(result.username).toBe(username);
	});

	test("Should update user | updateUserByEmail", async () => {
		const email = "email@test.com";
		const username = "username_two";
		const password = "hash_password_two";
		const sut = new UserRepositoryAdapter();

		const result = await sut.updateUserByEmail(email, { password, username });

		expect(result.password).toBe(password);
		expect(result.username).toBe(username);
	});

	test("Should delete user | deleteUserById", async () => {
		const id = "4";
		const sut = new UserRepositoryAdapter();

		const result = await sut.deleteUserById(id);

		expect(result.id).toBe(id);
	});
});