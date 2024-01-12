import { DomainError } from "@/layers/domain/errors";

export class InvalidUserEmailError extends DomainError {
	constructor(email: string) {
		super(`Esse email (${email}) é inválido`);
		this.name = "InvalidUserEmailError";
	}
}

export class InvalidUserPasswordError extends DomainError {
	constructor() {
		super("Sua senha precisa ter 8 caracteres, uma letra maiúscula, uma minúscula e um número");
		this.name = "InvalidUserPasswordError";
	}
}

export class InvalidUsernameError extends DomainError {
	constructor() {
		super("Nome de usuário inválido");
		this.name = "InvalidUsernameError";
		this.message = "Nome de usuário inválido";
	}
}