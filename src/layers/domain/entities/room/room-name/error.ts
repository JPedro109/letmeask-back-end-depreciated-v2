import { DomainError } from "@/layers/domain/errors";

export class InvalidRoomNameError extends DomainError {
	constructor(roomName: string) {
		super(`Esse nome de sala (${roomName}) é inválido, ele deve ter entre 2 e 18 caracteres`);
		this.name = "InvalidRoomNameError";
	}
}