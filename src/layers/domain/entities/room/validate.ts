import { InvalidRoomCodeError, InvalidRoomNameError, } from "@/layers/domain";
import { AbstractValidate } from "../abstract";

export class RoomValidate extends AbstractValidate {

	static roomCode(roomCode: string) {
		return this.validate(
			!roomCode || roomCode.length !== 6,
			new InvalidRoomCodeError(roomCode)
		);
	}

	static roomName(roomName: string) {
		return this.validate(
			!roomName || roomName.length < 2 || roomName.length > 18,
			new InvalidRoomNameError(roomName)
		);
	}
}