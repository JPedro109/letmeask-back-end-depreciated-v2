import { InvalidUserPasswordError } from "./errors";

export class UserPassword {

	private readonly password: string;
	
	private constructor(password: string) {
		this.password = password;
		Object.freeze(this);
	}

	public get value() : string {
		return this.password;
	}
	
	static create(password: string) {
		if(!this.validate(password)) return new InvalidUserPasswordError();

		return new UserPassword(password);
	}

	private static validate(password: string): boolean {
		if(!password) return false;

		const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])){8,}$/;

		if(!passwordRegEx.test(password)) return false;

		return true;
	}
}