import { DomainError } from "@/layers/domain/errors";

export class InvalidQuestionDescriptionError extends DomainError {
	constructor() {
		super("Descrição de pergunta inválida");
		this.name = "InvalidQuestionDescriptionError";
	}
}