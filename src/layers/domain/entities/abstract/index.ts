export abstract class AbstractEntity<Props> {
	constructor(
        protected props: Props, 
        private readonly idProps: string = "1"
	) { }

	protected static validate<T>(validations: T) {
		const errors = [];

		for(const key in validations) {
			if(validations[key] instanceof Error) {
				const error = validations[key] as Error;
				errors.push(error.message);
			}
		}

		return {
			valid: errors.length === 0,
			errors: errors.join(", ")
		};
	}
}