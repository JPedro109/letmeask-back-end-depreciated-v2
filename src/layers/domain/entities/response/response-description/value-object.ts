import { InvalidResponseDescriptionError } from "./errors";

export class ResponseDescription {

	private constructor(private readonly responseDescription: string) {
		this.responseDescription = responseDescription;
		Object.freeze(this);
	}

	public get value(): string {
		return this.responseDescription;
	}

	static create(responseDescription: string) {
		if(!this.validate(responseDescription)) return new InvalidResponseDescriptionError();

		return new ResponseDescription(responseDescription);
	}

	private static validate(responseDescription: string): boolean {
		if(!responseDescription) return false;

		if(responseDescription.length > 256) return false;

		return true;
	}
}