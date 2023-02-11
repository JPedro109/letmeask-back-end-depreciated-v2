import { 
	UserRepositoryStub, 
	RoomRepositoryStub,
	testRoomModel,
	CacheStub, 
} from "../__mocks__";
import { InvalidRoomCodeError } from "@/layers/entities";
import { DeleteRoomUseCase, NotFoundError, UnauthorizedError } from "@/layers/use-cases";

const makeSut = () => {
	const roomRepositoryStub = new RoomRepositoryStub();
	const userRepositoryStub = new UserRepositoryStub();
	const cacheStub = new CacheStub();
	const sut = new DeleteRoomUseCase(roomRepositoryStub, userRepositoryStub, cacheStub);

	return {
		roomRepositoryStub,
		userRepositoryStub,
		sut
	};
};

describe("Use case - DeleteRoomUseCase", () => {
    
	test("Should not delete room, because code is invalid", async () => {
		const userId = "2"; 
		const roomCode = "000"; 
		const { sut } = makeSut();

		const result = await sut.execute({ userId, roomCode });

		expect(result).toBeInstanceOf(InvalidRoomCodeError);
	});

	test("Should not delete room, because the room is not exists", async () => {
		const userId = "2"; 
		const roomCode = "000001"; 
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "roomExists").mockResolvedValueOnce(Promise.resolve(null));

		const result = await sut.execute({ userId, roomCode });

		expect(result).toBeInstanceOf(NotFoundError);
	});

	test("Should not delete room, because the user is admin", async () => {
		const userId = "2"; 
		const roomCode = "000001"; 
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "getCodeByUserId").mockResolvedValueOnce(Promise.resolve("000002"));

		const result = await sut.execute({ userId, roomCode });

		expect(result).toBeInstanceOf(UnauthorizedError);
	});

	test("Should delete room", async () => {
		const userId = "1"; 
		const roomCode = "000000"; 
		const { sut } = makeSut();

		const result = await sut.execute({ userId, roomCode });

		expect(result).toEqual(testRoomModel);
	});

});