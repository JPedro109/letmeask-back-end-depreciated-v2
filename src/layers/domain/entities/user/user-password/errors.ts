export class InvalidUserPasswordError extends Error {
	constructor() {
		super();
		this.name = "InvalidUserPasswordError";
		this.message = "Sua senha precisa ter 8 caracteres, uma letra maiúscula, uma minúscula e um número";
	}
}