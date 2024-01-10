export class InvalidRoomCodeError extends Error {
	constructor(roomCode: string) {
		super();
		this.name = "InvalidRoomCodeError";
		this.message = `Esse código da sala (${roomCode}) é inválido, ele deve ter 6 caracteres`;
	}
}