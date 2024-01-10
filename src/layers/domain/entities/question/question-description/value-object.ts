import { InvalidQuestionDescriptionError } from "./errors";

export class QuestionDescription {

	private constructor(private readonly questionDescription: string) {
		this.questionDescription = questionDescription;
		Object.freeze(this);
	}

	public get value(): string {
		return this.questionDescription;
	}

	static create(questionDescription: string) {
		if(!this.validate(questionDescription)) return new InvalidQuestionDescriptionError();

		return new QuestionDescription(questionDescription);
	}

	private static validate(questionDescription: string): boolean {
		if(!questionDescription) return false;

		if(questionDescription.length > 256) return false;

		return true;
	}
}