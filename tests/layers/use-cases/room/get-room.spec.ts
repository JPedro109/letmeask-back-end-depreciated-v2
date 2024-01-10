import { CacheStub, RoomRepositoryStub, testRoomModel } from "../__mocks__";
import { InvalidRoomCodeError } from "@/layers/domain";
import { GetRoomUseCase, NotFoundError } from "@/layers/domain";

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
 
	test("Should not get room, because code is invalid", async () => {
		const roomCode = "0000"; 
		const { sut } = makeSut();

		const result = await sut.execute({ roomCode });

		expect(result).toBeInstanceOf(InvalidRoomCodeError);
	});

	test("Should not get room, because the room is not exists", async () => {
		const roomCode = "000001"; 
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "getRoomByCode").mockResolvedValueOnce(Promise.resolve(null));

		const result = await sut.execute({ roomCode });

		expect(result).toBeInstanceOf(NotFoundError);
	});

	test("Should get room | database", async () => {
		const roomCode = "000000"; 
		const { sut } = makeSut();

		const result = await sut.execute({ roomCode });

		expect(result).toEqual(testRoomModel);
	});

	test("Should get room | cache", async () => {
		const roomCode = "000000"; 
		const { sut, cacheStub } = makeSut();
		jest.spyOn(cacheStub, "get").mockReturnValueOnce(testRoomModel);

		const result = await sut.execute({ roomCode });

		expect(result).toEqual(testRoomModel);
	});

});