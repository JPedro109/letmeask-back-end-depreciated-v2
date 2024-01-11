import { MissingParamError, InvalidTypeError } from "@/layers/presentation";

export class Validate {
	static fields(fields: { name: string, type: string, nullable?: boolean }[], body: object): { valid: boolean, errors: string } {
		const errors: string[] = [];
		
		fields.forEach(element => {
			const value = body[element.name];
	
			if(!value && !element.nullable) errors.push(new MissingParamError(element.name).message);
	
			if(typeof value !== element.type) errors.push(new InvalidTypeError(element.name).message);
		});
	
		return {
			errors: errors.join(", "),
			valid: errors.length === 0 ? true : false
		};
	} 
}