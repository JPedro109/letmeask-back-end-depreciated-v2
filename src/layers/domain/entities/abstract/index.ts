export abstract class AbstractEntity {
	protected static validateEntityAttributes(values: { invalid: boolean; error: string; }[]) {
		const errors = [];
		
		for(const value of values) {
			if(value.invalid) errors.push(value.error);
		}

		return {
			invalid: errors.length !== 0,
			errors: errors.join(", ")
		};
	}
}

export abstract class AbstractValidate {
	protected static validate(condition: boolean, error: Error) {
		return {
			invalid: condition,
			error: condition ? `${error.name}: ${error.message}` : null
		};
	}
}