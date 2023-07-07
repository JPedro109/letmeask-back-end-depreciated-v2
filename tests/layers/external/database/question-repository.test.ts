import { QuestionRepositoryAdapter, DatabaseSQLHelper, MockRepository } from "@/layers/external";
import { ResponseModel } from "@/layers/use-cases";

describe("External - QuestionRepositoryAdapter", () => {
    
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

	test("Should create question | store", async () => {
		const sut = new QuestionRepositoryAdapter();

		const room = await sut.store("000000", "question", "5");

		expect(room.roomCode).toBe("000000");
		expect(room.question).toBe("question");
		expect(room.userId).toBe("5");
	});

	test("Should get user questions  | getRoomByUserId", async () => {
		const sut = new QuestionRepositoryAdapter();

		const room = await sut.getRoomByUserId("5");

		expect(room[0].roomCode).toBe("000000");
		expect(room[0].question).toBe("question");
		expect(room[0].userId).toBe("5");
		expect(room[0].response).toEqual(new ResponseModel("8", "7", "response"));

		expect(room[1].roomCode).toBe("000000");
		expect(room[1].question).toBe("question-two");
		expect(room[1].userId).toBe("5");
	});

	test("Should get question with response | getById", async () => {
		const sut = new QuestionRepositoryAdapter();

		const room = await sut.getById("7");

		expect(room.roomCode).toBe("000000");
		expect(room.question).toBe("question");
		expect(room.userId).toBe("5");
		expect(room.response).toEqual(new ResponseModel("8", "7", "response"));
	});

	test("Should get question without response | getById", async () => {
		const sut = new QuestionRepositoryAdapter();

		const room = await sut.getById("9");

		expect(room.roomCode).toBe("000000");
		expect(room.question).toBe("question-two");
		expect(room.userId).toBe("5");
	});

	test("Should delete question | deleteQuestionById", async () => {
		const sut = new QuestionRepositoryAdapter();

		const roomOne = await sut.deleteQuestionById("7");
		const roomTwo = await sut.deleteQuestionById("9");

		expect(roomOne.roomCode).toBe("000000");
		expect(roomOne.question).toBe("question");
		expect(roomOne.userId).toBe("5");
		expect(roomOne.response).toEqual(new ResponseModel("8", "7", "response"));
		expect(roomTwo.roomCode).toBe("000000");
		expect(roomTwo.question).toBe("question-two");
		expect(roomTwo.userId).toBe("5");
	});
});