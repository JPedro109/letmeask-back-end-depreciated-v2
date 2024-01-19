import { AbstractEntity } from "@/layers/domain/entities/abstract";
import { ResponseDescription, DomainError } from "@/layers/domain";

export type ResponseProps = {
    id?: string;
    responseDescription: string;
}

export type ResponseValueObjectsProps = {
    responseDescription: ResponseDescription;
}

export class ResponseEntity extends AbstractEntity<ResponseValueObjectsProps> {

	private constructor(props: ResponseValueObjectsProps, id?: string) {
		super(props, id);
	}

	get responseDescription(): string {
		return this.props.responseDescription.value;
	}

	set responseDescription (responseDescription: string) {
		const result = ResponseDescription.create(responseDescription);
		if(result instanceof Error) throw result;
		this.props.responseDescription = result;
	}

	static create(props: ResponseProps): ResponseEntity {
		const valueObjects = {
			responseDescription: ResponseDescription.create(props.responseDescription)
		};

		const result = this.validate(valueObjects);

		if (!result.valid) throw new DomainError(result.errors);

		return new ResponseEntity({
			responseDescription: valueObjects.responseDescription as ResponseDescription
		}, props.id);
	}
}