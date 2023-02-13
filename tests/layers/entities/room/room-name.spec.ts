import { RoomName, InvalidRoomNameError } from "@/layers/entities";

describe("Object Value - RoomName", () => {

	test("Should not create room name, because room name is empty" , () => {
		const invalidRoomName = "";

		const sut = RoomName.create(invalidRoomName);

		expect(sut).toBeInstanceOf(InvalidRoomNameError);
	});

	test("Should not create room name, because the room name is not less than 2 characters" , () => {
		const invalidRoomName = "c";

		const sut = RoomName.create(invalidRoomName);

		expect(sut).toBeInstanceOf(InvalidRoomNameError);
	});

	test("Should not create room name, because the room name is not less than 19 characters" , () => {
		const invalidRoomName = "c".repeat(20);

		const sut = RoomName.create(invalidRoomName);

		expect(sut).toBeInstanceOf(InvalidRoomNameError);
	});

	test("Should create room name" , () => {
		const roomName = "123456";

		const sut = RoomName.create(roomName);

		if(!(sut instanceof Error)) expect(sut.value).toBe(roomName);
		expect(sut).toBeInstanceOf(RoomName);
	});
});