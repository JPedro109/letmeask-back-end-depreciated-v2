import { DomainError } from "@/layers/domain/errors";

export class InvalidRoomCodeError extends DomainError {
	constructor(roomCode: string) {
		super(`Esse código da sala (${roomCode}) é inválido, ele deve ter 6 caracteres`);
		this.name = "InvalidRoomCodeError";
	}
}

export class InvalidRoomNameError extends DomainError {
	constructor(roomName: string) {
		super(`Esse nome de sala (${roomName}) é inválido, ele deve ter entre 2 e 18 caracteres`);
		this.name = "InvalidRoomNameError";
	}
}