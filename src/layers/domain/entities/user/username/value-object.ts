import { InvalidUsernameError } from "./error";

export class Username {

	private constructor(private readonly username: string) {
		this.username = username;
		Object.freeze(this);
	}

	public get value(): string {
		return this.username;
	}

	static create(username: string): Username | InvalidUsernameError {
		if(!this.validate(username)) return new InvalidUsernameError();

		return new Username(username);
	}

	private static validate(username: string): boolean {
		if(!username) return false;

		if(username.length > 256) return false;

		return true;
	}
}