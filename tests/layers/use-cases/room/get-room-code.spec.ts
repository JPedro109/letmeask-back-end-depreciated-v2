import { RoomRepositoryStub } from "../__mocks__";
import { GetRoomCodeUseCase, NotFoundError } from "@/layers/use-cases";

const makeSut = () => {
	const roomRepositoryStub = new RoomRepositoryStub();
	const sut = new GetRoomCodeUseCase(roomRepositoryStub);

	return {
		roomRepositoryStub,
		sut
	};
};

describe("Use case - GetRoomCodeUseCase", () => {
    
	test("Should not get true, because the room is not exists", async () => {
		const roomCode = "000001"; 
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "roomExists").mockResolvedValueOnce(Promise.resolve(null));

		const result = await sut.execute({ roomCode });

		expect(result).toBeInstanceOf(NotFoundError);
	});

	test("Should get true", async () => {
		const roomCode = "000000"; 
		const { sut } = makeSut();

		const result = await sut.execute({ roomCode });

		expect(result).toEqual(true);
	});

});