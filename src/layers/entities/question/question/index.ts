import { QuestionDescription } from "@/layers/entities";

export class Question {

	private constructor(public readonly questionDescription: QuestionDescription) {
		this.questionDescription = questionDescription;
		Object.freeze(this);
	}

	static create(questionDescription: string) {
		const questionDescriptionOrError = QuestionDescription.create(questionDescription);

		if(questionDescriptionOrError instanceof Error) return questionDescriptionOrError;

		return new Question(questionDescriptionOrError);
	}

}