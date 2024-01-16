export class DomainError extends Error {
	constructor(paramName: string) {
		super();
		this.message = paramName;
		this.name = "DomainError";
	}
}