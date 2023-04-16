import { RoomCode, RoomName, InvalidRoomCodeError, InvalidRoomNameError } from "@/layers/entities";

export class Room {

	private constructor(
		public readonly roomCode: RoomCode, 
		public readonly roomName: RoomName
	) {
		this.roomCode = roomCode;
		this.roomName = roomName;
		Object.freeze(this);
	}

	static create(
		roomCode: string, 
		roomName: string,
	): Room | InvalidRoomCodeError | InvalidRoomNameError {
		const roomCodeOrError = RoomCode.create(roomCode);

		if(roomCodeOrError instanceof Error) return roomCodeOrError;

		const roomNameOrError = RoomName.create(roomName);

		if(roomNameOrError instanceof Error) return roomNameOrError;

		return new Room(roomCodeOrError, roomNameOrError);
	}
}