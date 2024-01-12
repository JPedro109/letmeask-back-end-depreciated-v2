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
import { CreateRoomUseCase, DomainError, UnauthorizedError } from "@/layers/domain";

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
    
	test("Should not create room, because the room rules are not respected", () => {
		const userId = "2"; 
		const roomName = ""; 
		const { sut } = makeSut();

		const response = sut.execute({ userId, roomName });
        
		expect(response).rejects.toThrow(DomainError);
	});

	test("Should not create room, because the user already has a room", () => {
		const userId = "1"; 
		const roomName = "room"; 
		const { sut, roomRepositoryStub, userRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "getRoomByUserId").mockResolvedValueOnce(null);
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce({ ...testUserModel, managedRoom: "000000" });
        
		const response = sut.execute({ userId, roomName });
        
		expect(response).rejects.toThrow(UnauthorizedError);
	});

	test("Should create room", async () => {
		const userId = "2"; 
		const roomName = "room"; 
		const { sut } = makeSut();

		const response = sut.execute({ userId, roomName });
        
		expect(response).resolves.toEqual(testRoomModel);
	});
});
