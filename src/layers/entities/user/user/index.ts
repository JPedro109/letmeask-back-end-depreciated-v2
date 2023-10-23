import { UserEmail, UserPassword, InvalidUserEmailError, InvalidUserPasswordError, Username, InvalidUsernameError } from "@/layers/entities";

export class User {

	private constructor(
		public readonly userEmail: UserEmail, 
		public readonly userPassword: UserPassword,
		public readonly username: Username
	) {
		this.userEmail = userEmail;
		this.userPassword = userPassword;
		this.username = username;
		Object.freeze(this);
	}

	static create(
		userEmail: string, 
		username: string,
		userPassword: string, 
	): User | InvalidUserEmailError | InvalidUserPasswordError | InvalidUsernameError {
		const userEmailOrError = UserEmail.create(userEmail);

		if(userEmailOrError instanceof Error) return userEmailOrError;

		const usernameOrError = Username.create(username);

		if(usernameOrError instanceof Error) return usernameOrError;

		const userPasswordOrError = UserPassword.create(userPassword);

		if(userPasswordOrError instanceof Error) return userPasswordOrError;

		return new User(userEmailOrError, userPasswordOrError, usernameOrError);
	}
}