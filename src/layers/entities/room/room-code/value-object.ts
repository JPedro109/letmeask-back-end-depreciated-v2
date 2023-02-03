import { InvalidRoomCodeError } from "./errors";

export class RoomCode {

	private constructor(private readonly roomCode: string) {
		this.roomCode = roomCode;
		Object.freeze(this);
	}

	public get value(): string {
		return this.roomCode;
	}

	static create(roomCode: string) {
		if(!this.validate(roomCode)) return new InvalidRoomCodeError(roomCode);

		return new RoomCode(roomCode);
	}

	private static validate(roomCode: string): boolean {
		if(!roomCode) return false;

		if(roomCode.length !== 6) return false;

		return true;
	}
}