import { UserValidate } from "@/layers/domain";
import { AbstractEntity } from "../abstract";

export class UserEntity extends AbstractEntity {

	static validate(
		userEmail: string, 
		username: string,
		userPassword: string
	) {
		return this.validateEntityAttributes(
			[
				UserValidate.email(userEmail),
				UserValidate.password(userPassword),
				UserValidate.username(username)
			]
		);
	}
}