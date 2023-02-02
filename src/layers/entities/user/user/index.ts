import { Email, Password, InvalidEmailError, InvalidPasswordError, Username, InvalidUsernameError } from "@/layers/entities";

export class User {

	private constructor(
		public readonly email: Email, 
		public readonly password: Password,
		public readonly username: Username
	) {
		this.email = email;
		this.password = password;
		this.username = username;
		Object.freeze(this);
	}

	static create(
		email: string, 
		username: string,
		password: string, 
	): User | InvalidEmailError | InvalidPasswordError | InvalidUsernameError {
		const userOrError = Email.create(email);

		if(userOrError instanceof Error) return userOrError;

		const usernameOrError = Username.create(username);

		if(usernameOrError instanceof Error) return usernameOrError;

		const passwordOrError = Password.create(password);

		if(passwordOrError instanceof Error) return passwordOrError;

		return new User(userOrError, passwordOrError, usernameOrError);
	}
}