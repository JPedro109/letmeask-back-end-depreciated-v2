import { InvalidResponseDescriptionError } from "@/layers/domain";
import { AbstractValidate } from "../abstract";

export class ResponseValidate extends AbstractValidate {

	static responseDescription(responseDescription: string) {
		return this.validate(
			!responseDescription || responseDescription.length > 256,
			new InvalidResponseDescriptionError()
		);
	}

}