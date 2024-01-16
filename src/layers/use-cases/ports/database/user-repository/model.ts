import { UserVerificationCodeModel } from "@/layers/use-cases";

export class UserModel {
	constructor(
                public readonly id: string,
                public readonly email: string,
                public readonly username: string,
                public readonly password: string,
                public readonly verifiedEmail: boolean,
                public readonly userVerificationCode?: UserVerificationCodeModel,
                public readonly managedRoom?: string
	) { }
}