import { RoomEntity } from "@/layers/domain";

describe("Entity - RoomEntity", () => {
    
	test("Should not create room, because room code and room name are not valid" , () => {
		const roomCode = "1324567";
		const roomName = "n".repeat(300);

		const sut = RoomEntity.validate(roomCode, roomName);

		expect(sut.invalid).toBeTruthy();
	});

	test("Should create room" , () => {
		const roomCode = "123456";
		const roomName = "Room Name";

		const sut = RoomEntity.validate(roomCode, roomName);

		expect(sut.invalid).toBeFalsy();
	});
});
