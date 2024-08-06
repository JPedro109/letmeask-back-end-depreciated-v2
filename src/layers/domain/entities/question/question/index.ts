import { AbstractEntity } from "@/layers/domain/entities/abstract";
import { QuestionDescription, DomainError } from "@/layers/domain";

export type QuestionProps = {
    id?: string;
    questionDescription: string;
}

export type QuestionValueObjectsProps = {
    questionDescription: QuestionDescription;
}

export class QuestionEntity extends AbstractEntity<QuestionValueObjectsProps> {

	private constructor(props: QuestionValueObjectsProps, id?: string) {
		super(props, id);
	}

	get questionDescription(): string {
		return this.props.questionDescription.value;
	}

	static create(props: QuestionProps): QuestionEntity {
		const valueObjects = {
			questionDescription: QuestionDescription.create(props.questionDescription)
		};

		const result = this.validate(valueObjects);

		if (!result.valid) throw new DomainError(result.errors);

		return new QuestionEntity({
			questionDescription: valueObjects.questionDescription as QuestionDescription
		}, props.id);
	}
}