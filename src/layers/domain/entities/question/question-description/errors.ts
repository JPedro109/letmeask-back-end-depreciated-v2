export class InvalidQuestionDescriptionError extends Error {
	constructor() {
		super();
		this.name = "InvalidQuestionDescriptionError";
		this.message = "Descrição de pergunta inválida";
	}
}