import { 
	QuestionRepositoryStub, 
	ResponseRepositoryStub, 
	RoomRepositoryStub, 
	UnitOfWorkStub, 
	UserRepositoryStub, 
	UserVerificationCodeRepositoryStub,  
	testUserModel,
	testRoomModel, 
} from "../__mocks__";
import { CreateRoomUseCase, UnauthorizedError } from "@/layers/use-cases";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const userVerificationCodeRepositoryStub = new UserVerificationCodeRepositoryStub();
	const roomRepositoryStub = new RoomRepositoryStub();
	const questionRepositoryStub = new QuestionRepositoryStub();
	const responseRepositoryStub = new ResponseRepositoryStub();
	const unitOfWorkStub = new UnitOfWorkStub(
		userRepositoryStub, 
		roomRepositoryStub, 
		questionRepositoryStub, 
		responseRepositoryStub, 
		userVerificationCodeRepositoryStub
	);
	const sut = new CreateRoomUseCase(unitOfWorkStub);

	return {
		roomRepositoryStub,
		userRepositoryStub,
		sut
	};
};

describe("Use case - CreateRoomUseCase", () => {
    
	test("Should not create room, because the room rules is not respect", async () => {
		const userId = "2"; 
		const roomName = ""; 
		const { sut } = makeSut();

		const result = await sut.execute({ userId, roomName });

		expect(result).toBeInstanceOf(Error);
	});

	test("Should not create room, because user already have a room", async () => {
		const userId = "1"; 
		const roomName = "room"; 
		const { sut, roomRepositoryStub, userRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "getRoomByUserId").mockResolvedValueOnce(Promise.resolve(null));
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(Promise.resolve({ ...testUserModel, managedRoom: "000000" }));
        
		const result = await sut.execute({ userId, roomName });

		expect(result).toBeInstanceOf(UnauthorizedError);
	});

	test("Should create room", async () => {
		const userId = "2"; 
		const roomName = "room"; 
		const { sut } = makeSut();

		const result = await sut.execute({ userId, roomName });

		expect(result).toEqual(testRoomModel);
	});
});