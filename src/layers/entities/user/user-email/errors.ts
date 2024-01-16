export class InvalidUserEmailError extends Error {
	constructor(email: string) {
		super();
		this.name = "InvalidUserEmailError";
		this.message = `Esse email (${email}) é inválido`;
	}
}