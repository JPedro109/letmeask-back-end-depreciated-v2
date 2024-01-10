import { RoomCode, InvalidRoomCodeError } from "@/layers/domain";

describe("Object Value - RoomCode", () => {

	test("Should not create room code, because room code is empty" , () => {
		const invalidRoomCode = "";

		const sut = RoomCode.create(invalidRoomCode);

		expect(sut).toBeInstanceOf(InvalidRoomCodeError);
	});

	test("Should not create room code, because the room code is not 6 characters long" , () => {
		const invalidRoomCode = "c";

		const sut = RoomCode.create(invalidRoomCode);

		expect(sut).toBeInstanceOf(InvalidRoomCodeError);
	});

	test("Should create room code" , () => {
		const roomCode = "123456";

		const sut = RoomCode.create(roomCode);

		if(!(sut instanceof Error)) expect(sut.value).toBe(roomCode);
		expect(sut).toBeInstanceOf(RoomCode);
	});
});