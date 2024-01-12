import { InvalidQuestionDescriptionError } from "@/layers/domain";
import { AbstractValidate } from "../abstract";

export class QuestionValidate extends AbstractValidate {

	static questionDescription(questionDescription: string) {
		return this.validate(
			!questionDescription || questionDescription.length > 256,
			new InvalidQuestionDescriptionError()
		);
	}

}