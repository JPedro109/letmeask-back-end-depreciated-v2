import { 
	RoomRepositoryStub, 
	UserRepositoryStub, 
	testUserModel,
	testRoomModel, 
} from "../__mocks__";
import { DomainError } from "@/layers/domain";
import { CreateRoomUseCase, UnauthorizedError } from "@/layers/application";

const makeSut = () => {
	const userRepositoryStub = new UserRepositoryStub();
	const roomRepositoryStub = new RoomRepositoryStub();
	const sut = new CreateRoomUseCase(roomRepositoryStub);

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
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce({ ...testUserModel });
        
		const response = sut.execute({ userId, roomName });
        
		expect(response).rejects.toThrow(UnauthorizedError);
	});

	test("Should create room", async () => {
		const userId = "2"; 
		const roomName = "room"; 
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "getCodeByUserId").mockResolvedValueOnce(null);

		const response = sut.execute({ userId, roomName });
        
		expect(response).resolves.toEqual(testRoomModel);
	});
});
