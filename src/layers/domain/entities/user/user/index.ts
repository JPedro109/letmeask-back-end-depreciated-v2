import { AbstractEntity } from "@/layers/domain/entities/abstract";
import { UserEmail, UserPassword, Username, DomainError } from "@/layers/domain";

export type UserProps = {
	id?: string;
	email: string;
	username: string;
	password: string;
	verifiedEmail: boolean;
}

export type UserValueObjectsProps = {
	email: UserEmail;
	password: UserPassword;
	username: Username;
	verifiedEmail: boolean;
}

export class UserEntity extends AbstractEntity<UserValueObjectsProps> {

	private constructor(props: UserValueObjectsProps, id?: string) {
		super(props, id);
	}

	get email(): string {
		return this.props.email.value;
	}

	set email(email: string) {
		const result = UserEmail.create(email);
		if (result instanceof Error) throw result;
		this.props.email = result;
	}

	get username(): string {
		return this.props.username.value;
	}

	set username(username: string) {
		const result = Username.create(username);
		if (result instanceof Error) throw result;
		this.props.username = result;
	}

	get password(): string {
		return this.props.password.value;
	}

	set password(password: string) {
		const result = UserPassword.create(password);
		if (result instanceof Error) throw result;
		this.props.password = result;
	}

	get verifiedEmail(): boolean {
		return this.props.verifiedEmail;
	}

	set verifiedEmail(verifiedEmail: boolean) {
		if(this.props.verifiedEmail) throw new DomainError("O email já está verificado");
		this.props.verifiedEmail = verifiedEmail;
	}

	static create(props: UserProps): UserEntity {
		const valueObjets = {
			email: UserEmail.create(props.email),
			password: UserPassword.create(props.password),
			username: Username.create(props.username)
		};

		const result = this.validate(valueObjets);

		if(!result.valid) throw new DomainError(result.errors);

		return new UserEntity({
			email: valueObjets.email as UserEmail,
			password: valueObjets.password as UserPassword,
			username: valueObjets.username as Username,
			verifiedEmail: props.verifiedEmail
		}, props.id);
	}
}