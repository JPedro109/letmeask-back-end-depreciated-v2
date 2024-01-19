import { 
	RoomRepositoryStub,
	testRoomModel,
	CacheStub, 
} from "../__mocks__";
import { DomainError } from "@/layers/domain";
import { DeleteRoomUseCase, NotFoundError, UnauthorizedError } from "@/layers/application";

const makeSut = () => {
	const roomRepositoryStub = new RoomRepositoryStub();
	const cacheStub = new CacheStub();
	const sut = new DeleteRoomUseCase(roomRepositoryStub, cacheStub);

	return {
		roomRepositoryStub,
		sut
	};
};

describe("Use case - DeleteRoomUseCase", () => {
    
	test("Should not delete room, because code is invalid", () => {
		const userId = "2"; 
		const roomCode = "000"; 
		const { sut } = makeSut();

		const response = sut.execute({ userId, roomCode });

		expect(response).rejects.toThrow(DomainError);
	});

	test("Should not delete room, because the room is not exists", () => {
		const userId = "2"; 
		const roomCode = "000001"; 
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "roomExists").mockResolvedValueOnce(Promise.resolve(null));

		const response = sut.execute({ userId, roomCode });

		expect(response).rejects.toThrow(NotFoundError);
	});

	test("Should not delete room, because the user is admin", () => {
		const userId = "2"; 
		const roomCode = "000001"; 
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "getCodeByUserId").mockResolvedValueOnce(Promise.resolve("000002"));

		const response = sut.execute({ userId, roomCode });

		expect(response).rejects.toThrow(UnauthorizedError);
	});

	test("Should delete room", () => {
		const userId = "1"; 
		const roomCode = "000000"; 
		const { sut } = makeSut();

		const response = sut.execute({ userId, roomCode });

		expect(response).resolves.toEqual(testRoomModel);
	});

});
