export class InvalidRequestError extends Error {

	constructor(paramName: string) {
		super(paramName);
		this.name = "InvalidRequestError";
	}
}

export class MissingParamError extends Error {

	constructor (paramName: string) {
		super("Missing param: " + paramName);
		this.name = "MissingParamError";
	}
}

export class InvalidTypeError extends Error {

	constructor (paramName: string) {
		super("Param: " + paramName + " has wrong type");
		this.name = "InvalidTypeError";
	}
}

export class InternalServerError extends Error {
	
	constructor () {
		super("Internal server error");
		this.name = "InternalServerError";
	}
}