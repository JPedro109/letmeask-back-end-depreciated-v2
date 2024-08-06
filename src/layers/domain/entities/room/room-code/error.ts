import { DomainError } from "@/layers/domain/errors";

export class InvalidRoomCodeError extends DomainError {
	constructor(roomCode: string) {
		super(`Esse código da sala (${roomCode}) é inválido, ele deve ter 6 caracteres`);
		this.name = "InvalidRoomCodeError";
	}
}