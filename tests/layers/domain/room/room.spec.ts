import { RoomEntity, DomainError, InvalidRoomNameError, InvalidRoomCodeError } from "@/layers/domain";

describe(("Entity - Room"), () => {
    
	test("Should not create user, because room code is not valid" , () => {
		const invalidRoomCode = "";
		const roomName = "Room";

		const sut = () => RoomEntity.create(
			{
				roomCode: invalidRoomCode, 
				roomName
			}
		);

		expect(sut).toThrow(DomainError);
	});

	test("Should not create room, because room name is not valid" , () => {
		const roomCode = "123456";
		const invalidRoomName = "";

		const sut = () => RoomEntity.create(
			{
				roomCode: roomCode, 
				roomName: invalidRoomName
			}
		);

		expect(sut).toThrow(DomainError);
	});

	test("Should create room" , () => {
		const roomCode = "123456";
		const roomName = "Room";

		const sut = RoomEntity.create(
			{
				roomCode: roomCode, 
				roomName
			}
		);

		expect(sut).toBeInstanceOf(RoomEntity);
	});

	test("Should not update room name, because room name is incorrect" , () => {
		const roomCode = "123456";
		const roomName = "Room";
		const room = RoomEntity.create(
			{
				roomCode: roomCode, 
				roomName
			}
		);

		const sut = () => room.roomName = "";

		expect(sut).toThrow(InvalidRoomNameError);
	});

	test("Should update room name" , () => {
		const roomCode = "123456";
		const roomName = "Room";
		const room = RoomEntity.create(
			{
				roomCode: roomCode, 
				roomName
			}
		);

		room.roomName = "Room Two";

		expect(room.roomName).toBe("Room Two");
	});

	test("Should not update room code, because room code is incorrect" , () => {
		const roomCode = "123456";
		const roomName = "Room";
		const room = RoomEntity.create(
			{
				roomCode: roomCode, 
				roomName
			}
		);

		const sut = () => room.roomCode = "";

		expect(sut).toThrow(InvalidRoomCodeError);
	});


	test("Should update room code" , () => {
		const roomCode = "123456";
		const roomName = "Room";
		const room = RoomEntity.create(
			{
				roomCode: roomCode, 
				roomName
			}
		);

		room.roomCode = "123457";

		expect(room.roomCode).toBe("123457");
	});
});