import { InvalidUserEmailError, InvalidUserPasswordError, InvalidUsernameError } from "@/layers/domain";
import { AbstractValidate } from "../abstract";

export class UserValidate extends AbstractValidate {

	static email(email: string) {
		const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		const [account, domain] = email.split("@");

		return this.validate(
			!email || email.length > 256 || !emailRegEx.test(email) || account.length > 64 || domain.length > 64,
			new InvalidUserEmailError(email)
		);
	}

	static password(password: string) {
		const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])){8,}$/;

		return this.validate(
			!password || !passwordRegEx.test(password),
			new InvalidUserPasswordError()
		);
	}

	static username(username: string) {
		return this.validate(
			!username || username.length > 256,
			new InvalidUsernameError()
		);
	}
}