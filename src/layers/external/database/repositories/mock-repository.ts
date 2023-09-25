import { DatabaseSQLHelper } from "../helpers";

export class MockRepository {

	// Id used for tests where the query return null - 0

	async createMocksToTestRoutes() {
		await DatabaseSQLHelper.client.user.create({
			data: {
				id: "1",
				email: "email_verified_and_with_room@test.com",
				username: "username",
				password: "$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS", //Password1234
				verified_email: true,
				created_at: new Date(),
				updated_at: null,
				managed_room: "000000"
			}
		});

		await DatabaseSQLHelper.client.user_verification_code.create({
			data: {
				id: "1",
				verification_code: "email_code",
				verification_code_expiry_date: 999999999999999,
				user_id: "1",
				valid: true,
				password_recovery: false
			}
		});

		await DatabaseSQLHelper.client.user_verification_code.create({
			data: {
				id: "2",
				verification_code: "password_code",
				verification_code_expiry_date: 999999999999999,
				user_id: "1",
				valid: true,
				password_recovery: true
			}
		});

		await DatabaseSQLHelper.client.user.create({
			data: {
				id: "2",
				email: "email_verified_code_expiry@test.com",
				username: "username",
				password: "$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS", //Password1234
				verified_email: true,
				created_at: new Date(),
				updated_at: null,
			}
		});

		await DatabaseSQLHelper.client.user_verification_code.create({
			data: {
				id: "3",
				verification_code: "email_code_expiry",
				verification_code_expiry_date: 0,
				user_id: "2",
				valid: true,
				password_recovery: false
			}
		});

		await DatabaseSQLHelper.client.user_verification_code.create({
			data: {
				id: "4",
				verification_code: "password_code_expiry",
				verification_code_expiry_date: 0,
				user_id: "2",
				valid: true,
				password_recovery: true
			}
		});

		await DatabaseSQLHelper.client.user.create({
			data: {
				id: "3",
				email: "email_not_verified@test.com",
				username: "username",
				password: "$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS", //Password1234
				verified_email: false,
				created_at: new Date(),
				updated_at: null
			}
		});

		await DatabaseSQLHelper.client.user_verification_code.create({
			data: {
				id: "5",
				verification_code: "email_verification_code",
				verification_code_expiry_date: 999999999999999,
				user_id: "3",
				valid: true,
				password_recovery: false
			}
		});

		await DatabaseSQLHelper.client.room.create({
			data: {
				id: "10",
				code: "000000",
				name: "room",
				user_id: "1"
			}
		});

		await DatabaseSQLHelper.client.question.create({
			data: {
				id: "11",
				room_code: "000000",
				question: "question",
				user_id: "2"
			}
		});

		await DatabaseSQLHelper.client.response.create({
			data: {
				id: "12",
				question_id: "11",
				response: "response"
			}
		});

		await DatabaseSQLHelper.client.question.create({
			data: {
				id: "13",
				room_code: "000000",
				question: "question-two",
				user_id: "2"
			}
		});
	}

	async createMocksToTestRepositories() {
		await DatabaseSQLHelper.client.user.create({
			data: {
				id: "4",
				email: "email@test.com",
				username: "username",
				password: "hash_password",
				verified_email: false,
				created_at: new Date(),
				updated_at: null
			}
		});

		await DatabaseSQLHelper.client.user_verification_code.create({
			data: {
				id: "6",
				verification_code: "repository_code_one",
				verification_code_expiry_date: 0,
				user_id: "4",
				valid: true,
				password_recovery: false
			}
		});

		await DatabaseSQLHelper.client.user.create({
			data: {
				id: "5",
				email: "email_two@test.com",
				username: "username",
				password: "hash_password",
				verified_email: true,
				created_at: new Date(),
				updated_at: null
			}
		});

		await DatabaseSQLHelper.client.user_verification_code.create({
			data: {
				id: "8",
				verification_code: "repository_code_two",
				verification_code_expiry_date: 0,
				user_id: "5",
				valid: true,
				password_recovery: false
			}
		});

		await DatabaseSQLHelper.client.room.create({
			data: {
				id: "6",
				code: "000000",
				name: "Room",
				user_id: "4"
			}
		});

		await DatabaseSQLHelper.client.question.create({
			data: {
				id: "7",
				room_code: "000000",
				question: "question",
				user_id: "5"
			}
		});

		await DatabaseSQLHelper.client.response.create({
			data: {
				id: "8",
				question_id: "7",
				response: "response"
			}
		});

		await DatabaseSQLHelper.client.question.create({
			data: {
				id: "9",
				room_code: "000000",
				question: "question-two",
				user_id: "5"
			}
		});
	}

	async deleteMocks() {
		await DatabaseSQLHelper.client.response.deleteMany({});
		await DatabaseSQLHelper.client.question.deleteMany({});
		await DatabaseSQLHelper.client.room.deleteMany({});
		await DatabaseSQLHelper.client.user_verification_code.deleteMany({});
		await DatabaseSQLHelper.client.user.deleteMany({});
	}
}