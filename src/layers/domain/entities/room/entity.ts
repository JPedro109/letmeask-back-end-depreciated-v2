import { RoomValidate } from "@/layers/domain";
import { AbstractEntity } from "../abstract";

export class RoomEntity extends AbstractEntity {

	static validate(
		roomCode: string, 
		roomName: string,
	) {
		return this.validateEntityAttributes(
			[
				RoomValidate.roomCode(roomCode),
				RoomValidate.roomName(roomName)
			]
		);
	}
}