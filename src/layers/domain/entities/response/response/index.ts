import { ResponseDescription } from "@/layers/domain";

export class Response {

	private constructor(public readonly responseDescription: ResponseDescription) {
		this.responseDescription = responseDescription;
		Object.freeze(this);
	}

	static create(responseDescription: string) {
		const responseDescriptionOrError = ResponseDescription.create(responseDescription);

		if(responseDescriptionOrError instanceof Error) return responseDescriptionOrError;

		return new Response(responseDescriptionOrError);
	}

}