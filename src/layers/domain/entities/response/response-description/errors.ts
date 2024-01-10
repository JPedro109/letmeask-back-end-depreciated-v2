export class InvalidResponseDescriptionError extends Error {
	constructor() {
		super();
		this.name = "InvalidResponseDescriptionError";
		this.message = "Descrição da resposts inválida";
	}
}