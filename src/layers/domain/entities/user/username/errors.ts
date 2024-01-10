export class InvalidUsernameError extends Error {
	constructor() {
		super();
		this.name = "InvalidUsernameError";
		this.message = "Nome de usuário inválido";
	}
}