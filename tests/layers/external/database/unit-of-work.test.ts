import { 
	UserRepositoryAdapter,
	RoomRepositoryAdapter,
	QuestionRepositoryAdapter,
	ResponseRepositoryAdapter,
	UnitOfWorkAdapter,
} from "@/layers/external";
import { DatabaseSQLHelper, UserVerificationCodeRepositoryAdapter } from "@/layers/external/database";

describe("External - UnitOfWorkAdapter", () => {
	const databaseSQLHelper = new DatabaseSQLHelper();

	test("Should get instances", async () => {
		const userRepositoryAdapter = new UserRepositoryAdapter(databaseSQLHelper);
		const userVerificationCodeRepositoryAdapter = new UserVerificationCodeRepositoryAdapter(databaseSQLHelper);
		const roomRepositoryAdapter = new RoomRepositoryAdapter(databaseSQLHelper);
		const questionRepositoryAdapter = new QuestionRepositoryAdapter(databaseSQLHelper);
		const responseRepositoryAdapter = new ResponseRepositoryAdapter(databaseSQLHelper);
    
		const sut = new UnitOfWorkAdapter(
			databaseSQLHelper,
			userRepositoryAdapter, 
			roomRepositoryAdapter, 
			questionRepositoryAdapter, 
			responseRepositoryAdapter,
			userVerificationCodeRepositoryAdapter
		);

		expect(sut.getUserRepository()).toBeInstanceOf(UserRepositoryAdapter);
		expect(sut.getUserVerificationCodeRepository()).toBeInstanceOf(UserVerificationCodeRepositoryAdapter);
		expect(sut.getRoomRepository()).toBeInstanceOf(RoomRepositoryAdapter);
		expect(sut.getQuestionRepository()).toBeInstanceOf(QuestionRepositoryAdapter);
		expect(sut.getResponseRepository()).toBeInstanceOf(ResponseRepositoryAdapter);
	});
});