import { RoomValidate } from "@/layers/domain";

describe("Entity - RoomValidate", () => {
	describe("roomCode", () => {
		test("Should not create room code, because room code is empty", () => {
			const invalidRoomCode = "";

			const sut = RoomValidate.roomCode(invalidRoomCode);

			expect(sut.invalid).toBeTruthy();
		});

		test("Should not create room code, because room code length is not equal to 6", () => {
			const invalidRoomCode = "12345";

			const sut = RoomValidate.roomCode(invalidRoomCode);

			expect(sut.invalid).toBeTruthy();
		});

		test("Should create room code", () => {
			const roomCode = "123456";

			const sut = RoomValidate.roomCode(roomCode);

			expect(sut.invalid).toBeFalsy();
		});
	});

	describe("roomName", () => {
		test("Should not create room name, because room name is empty", () => {
			const invalidRoomName = "";

			const sut = RoomValidate.roomName(invalidRoomName);

			expect(sut.invalid).toBeTruthy();
		});

		test("Should not create room name, because room name length is less than 2 characters", () => {
			const invalidRoomName = "a";

			const sut = RoomValidate.roomName(invalidRoomName);

			expect(sut.invalid).toBeTruthy();
		});

		test("Should not create room name, because room name length is greater than 18 characters", () => {
			const invalidRoomName = "ThisIsAVeryLongRoomName";

			const sut = RoomValidate.roomName(invalidRoomName);

			expect(sut.invalid).toBeTruthy();
		});

		test("Should create room name", () => {
			const roomName = "Test Room";

			const sut = RoomValidate.roomName(roomName);

			expect(sut.invalid).toBeFalsy();
		});
	});
});
