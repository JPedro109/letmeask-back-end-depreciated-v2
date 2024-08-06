import { DomainError } from "@/layers/domain/errors";

export class InvalidResponseDescriptionError extends DomainError {
	constructor() {
		super("Descrição da resposts inválida");
		this.name = "InvalidResponseDescriptionError";
	}
}