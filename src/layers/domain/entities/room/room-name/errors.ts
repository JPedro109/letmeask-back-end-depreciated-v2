export class InvalidRoomNameError extends Error {
	constructor(roomName: string) {
		super();
		this.name = "InvalidRoomNameError";
		this.message = `Esse nome de sala (${roomName}) é inválido, ele deve ter entre 2 e 18 caracteres`;
	}
}