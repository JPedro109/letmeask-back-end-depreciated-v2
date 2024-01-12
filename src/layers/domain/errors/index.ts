export class DomainError extends Error {

	constructor(paramName: string) {
		super();
		this.message = paramName;
		this.name = "DomainError";
	}
}

export class InvalidParamError extends Error {

	constructor(paramName: string) {
		super(paramName);
		this.name = "InvalidParamError";
	}
}

export class NotFoundError extends Error {

	constructor(paramName: string) {
		super(paramName);
		this.name = "NotFoundError";
	}
}

export class UnauthorizedError extends Error {

	constructor(paramName: string) {
		super(paramName);
		this.name = "UnauthorizedError";
	}
}