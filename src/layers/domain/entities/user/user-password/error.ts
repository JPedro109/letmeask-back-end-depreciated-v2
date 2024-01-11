import { DomainError } from "@/layers/domain/errors";

export class InvalidUserPasswordError extends DomainError {
	constructor() {
		super("Sua senha precisa ter 8 caracteres, uma letra maiúscula, uma minúscula e um número");
		this.name = "InvalidUserPasswordError";
	}
}