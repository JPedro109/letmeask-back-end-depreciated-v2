import { 
	UserRepositoryAdapter,
	RoomRepositoryAdapter,
	QuestionRepositoryAdapter,
	ResponseRepositoryAdapter,
	UnitOfWorkAdapter,
} from "@/layers/external";
import { UserVerificationCodeRepositoryAdapter } from "@/layers/external/repositories/repositories/user-verification-code-repository";

describe("External - UnitOfWorkAdapter", () => {

	test("Should get instances", async () => {
		const userRepositoryAdapter = new UserRepositoryAdapter();
		const userVerificationCodeRepositoryAdapter = new UserVerificationCodeRepositoryAdapter();
		const roomRepositoryAdapter = new RoomRepositoryAdapter();
		const questionRepositoryAdapter = new QuestionRepositoryAdapter();
		const responseRepositoryAdapter = new ResponseRepositoryAdapter();
    
		const sut = new UnitOfWorkAdapter(
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