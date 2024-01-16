import { CacheStub, RoomRepositoryStub, testRoomModel } from "../__mocks__";
import { DomainError } from "@/layers/domain";
import { GetRoomUseCase, NotFoundError } from "@/layers/application";

const makeSut = () => {
	const roomRepositoryStub = new RoomRepositoryStub();
	const cacheStub = new CacheStub();
	const sut = new GetRoomUseCase(roomRepositoryStub, cacheStub);

	return {
		roomRepositoryStub,
		cacheStub,
		sut
	};
};

describe("Use case - GetRoomUseCase", () => {
 
	test("Should not get room, because code is invalid", () => {
		const roomCode = "0000"; 
		const { sut } = makeSut();

		const response = sut.execute({ roomCode });

		expect(response).rejects.toThrow(DomainError);
	});

	test("Should not get room, because the room is not exists", () => {
		const roomCode = "000001"; 
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "getRoomByCode").mockResolvedValueOnce(null);

		const response = sut.execute({ roomCode });

		expect(response).rejects.toThrow(NotFoundError);
	});

	test("Should get room | database", () => {
		const roomCode = "000000"; 
		const { sut } = makeSut();

		const response = sut.execute({ roomCode });

		expect(response).resolves.toEqual(testRoomModel);
	});

	test("Should get room | cache", () => {
		const roomCode = "000000"; 
		const { sut, cacheStub } = makeSut();
		jest.spyOn(cacheStub, "get").mockReturnValueOnce(testRoomModel);

		const response = sut.execute({ roomCode });

		expect(response).resolves.toEqual(testRoomModel);
	});

});
