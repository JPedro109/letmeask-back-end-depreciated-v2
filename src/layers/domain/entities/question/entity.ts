import { QuestionValidate } from "@/layers/domain";
import { AbstractEntity } from "../abstract";

export class QuestionEntity extends AbstractEntity {

	static validate(
		questionDescription: string
	) {
		return this.validateEntityAttributes(
			[
				QuestionValidate.questionDescription(questionDescription)
			]
		);
	}
}