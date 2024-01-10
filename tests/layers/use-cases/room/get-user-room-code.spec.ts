import { RoomRepositoryStub } from "../__mocks__";
import { GetUserRoomCodeUseCase } from "@/layers/domain";

const makeSut = () => {
	const roomRepositoryStub = new RoomRepositoryStub();
	const sut = new GetUserRoomCodeUseCase(roomRepositoryStub);

	return {
		roomRepositoryStub,
		sut
	};
};

describe("Use case - GetUserRoomCodeUseCase", () => {
    
	test("Should not get user room, because the user has not a room", async () => {
		const userId = "2"; 
		const { sut, roomRepositoryStub } = makeSut();
		jest.spyOn(roomRepositoryStub, "getCodeByUserId").mockResolvedValueOnce(Promise.resolve(null));

		const result = await sut.execute({ userId });

		expect(result).toBe(null);
	});

	test("Should get user room", async () => {
		const userId = "1"; 
		const { sut } = makeSut();

		const result = await sut.execute({ userId });

		expect(result).toEqual("000000");
	});

});