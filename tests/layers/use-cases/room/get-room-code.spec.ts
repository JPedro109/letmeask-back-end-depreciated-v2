import { RoomRepositoryStub } from "../__mocks__";
import { GetRoomCodeUseCase, NotFoundError } from "@/layers/domain";

const makeSut = () => {
	const roomRepositoryStub = new RoomRepositoryStub();
	const sut = new GetRoomCodeUseCase(roomRepositoryStub);

	return {
		roomRepositoryStub,
		sut
	};
};

describe("Use case - GetRoomCodeUseCase", () => {
    
	test("Should not get true, because the room is not exists", () => {
		const roomCode = "000001"; 
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "roomExists").mockResolvedValueOnce(Promise.resolve(null));

		const response = sut.execute({ roomCode });

		expect(response).rejects.toThrow(NotFoundError);
	});

	test("Should get true", () => {
		const roomCode = "000000"; 
		const { sut } = makeSut();

		const response = sut.execute({ roomCode });

		expect(response).resolves.toEqual(true);
	});

});
