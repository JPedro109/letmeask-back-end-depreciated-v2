import { RoomRepositoryStub } from "../__mocks__";
import { GetUserRoomCodeUseCase } from "@/layers/application";

const makeSut = () => {
	const roomRepositoryStub = new RoomRepositoryStub();
	const sut = new GetUserRoomCodeUseCase(roomRepositoryStub);

	return {
		roomRepositoryStub,
		sut
	};
};

describe("Use case - GetUserRoomCodeUseCase", () => {
    
	test("Should not get user room, because the user has not a room", () => {
		const userId = "2"; 
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "getCodeByUserId").mockResolvedValueOnce(null);

		const response = sut.execute({ userId });

		expect(response).resolves.toBe(null);
	});

	test("Should get user room", () => {
		const userId = "1"; 
		const { sut } = makeSut();

		const response = sut.execute({ userId });

		expect(response).resolves.toEqual("000000");
	});

});
