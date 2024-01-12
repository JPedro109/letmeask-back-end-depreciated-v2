import { ResponseValidate } from "@/layers/domain";
import { AbstractEntity } from "../abstract";

export class ResponseEntity extends AbstractEntity {

	static validate(
		responseDescription: string
	) {
		return this.validateEntityAttributes(
			[
				ResponseValidate.responseDescription(responseDescription)
			]
		);
	}
}