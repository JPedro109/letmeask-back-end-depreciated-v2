import { Room, InvalidRoomCodeError, InvalidRoomNameError } from "@/layers/domain";

describe(("Entity - Room"), () => {
    
	test("Should not create user, because room code is not valid" , () => {
		const invalidRoomCode = "";
		const roomName = "Room";

		const sut = Room.create(invalidRoomCode, roomName);

		expect(sut).toBeInstanceOf(InvalidRoomCodeError);
	});

	test("Should not create room, because room name is not valid" , () => {
		const roomCode = "123456";
		const invalidRoomName = "";

		const sut = Room.create(roomCode, invalidRoomName);

		expect(sut).toBeInstanceOf(InvalidRoomNameError);
	});

	test("Should create room" , () => {
		const roomCode = "123456";
		const roomName = "Room";

		const sut = Room.create(roomCode, roomName);

		expect(sut).toBeInstanceOf(Room);
	});
});