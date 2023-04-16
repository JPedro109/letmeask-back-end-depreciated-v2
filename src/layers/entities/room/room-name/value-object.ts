import { InvalidRoomNameError } from "./errors";

export class RoomName {

	private constructor(private readonly roomName: string) {
		this.roomName = roomName;
		Object.freeze(this);
	}

	public get value(): string {
		return this.roomName;
	}

	static create(roomName: string) {
		if(!this.validate(roomName)) return new InvalidRoomNameError(roomName);

		return new RoomName(roomName);
	}

	private static validate(roomName: string): boolean {
		if(!roomName) return false;

		if(roomName.length < 2 || roomName.length > 18) return false;

		return true;
	}
}