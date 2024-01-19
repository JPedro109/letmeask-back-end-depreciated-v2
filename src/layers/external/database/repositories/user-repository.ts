import { UserModel, UserRepositoryProtocol, UserVerificationCodeModel } from "@/layers/application";
import { Context, DatabaseSQLHelper, camelToSnakeCaseMapper } from "@/layers/external";

import { user as UserPrismaModel, user_verification_code as UserVerificationCodePrismaModel } from "@prisma/client";

export class UserRepositoryAdapter implements UserRepositoryProtocol {

	constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) { }

	private context: Context = this.databaseSQLHelper.client;

	setContext(context: unknown): void {
		this.context = context as Context;
	}

	private toMapperUserModel(user: UserPrismaModel) {
		return new UserModel(
			user.id, 
			user.email, 
			user.username, 
			user.password, 
			user.verified_email, 
			null
		);
	}

	private toMapperUserModelWithVerificationCode(user: UserPrismaModel & {
		user_verification_code: UserVerificationCodePrismaModel[];
	}) {
		return new UserModel(
			user.id, 
			user.email, 
			user.username, 
			user.password, 
			user.verified_email, 
			user.user_verification_code[0] ? new UserVerificationCodeModel(
				user.user_verification_code[0].id,
				user.user_verification_code[0].user_id,
				user.user_verification_code[0].verification_code,
				Number(user.user_verification_code[0].verification_code_expiry_date),
				user.user_verification_code[0].valid,
				user.user_verification_code[0].password_recovery
			) : null
		);
	}

	async createUser(email: string, username: string, hashPassword: string): Promise<UserModel> {
		const user = await this.context.user.create({
			data: {
				email,
				username,
				password: hashPassword,
				verified_email: false,
				managed_room: null,
			}
		});
		
		return this.toMapperUserModel(user);
	}

	async getUserById(id: string): Promise<UserModel | null> {		
		const user = await this.context.user.findUnique({
			where: {
				id
			}
		});

		if(!user) return null;

		return this.toMapperUserModel(user);
	}

	async getUserByEmail(email: string): Promise<UserModel | null> {
		const user = await this.context.user.findUnique({
			where: {
				email
			}
		});

		if(!user) return null;

		return this.toMapperUserModel(user);
	}

	async getUserByIdWithVerificationCode(id: string, verificationCode: string, passwordRecoveryCode: boolean): Promise<UserModel | null> {		
		const user = await this.context.user.findUnique({
			where: {
				id
			},
			include: {
				user_verification_code: {
					where: {
						verification_code: verificationCode,
						password_recovery: passwordRecoveryCode
					}
				}
			}
		});

		if(!user) return null;

		return this.toMapperUserModelWithVerificationCode(user);
	}

	async getUserByEmailWithVerificationCode(email: string, verificationCode: string, passwordRecoveryCode: boolean): Promise<UserModel | null> {
		const user = await this.context.user.findUnique({
			where: {
				email
			},
			include: {
				user_verification_code: {
					where: {
						verification_code: verificationCode,
						password_recovery: passwordRecoveryCode
					}
				}
			}
		});

		if(!user) return null;

		return this.toMapperUserModelWithVerificationCode(user);
	}

	async updateUserById(id: string, data: Partial<UserModel>): Promise<UserModel> {
		const user = await this.context.user.update({
			where: {
				id
			},
			data: {
				...camelToSnakeCaseMapper(data),
				updated_at: new Date()
			}
		});

		return this.toMapperUserModel(user);
	}

	async updateUserByEmail(email: string, data: Partial<UserModel>): Promise<UserModel> {
		const user = await this.context.user.update({
			where: {
				email
			},
			data: {
				...camelToSnakeCaseMapper(data),
				updated_at: new Date()
			}
		});

		return this.toMapperUserModel(user);
	}

	async deleteUserById(id: string): Promise<UserModel> {
		const user = await this.context.user.delete({
			where: {
				id
			}
		});

		return this.toMapperUserModel(user);
	}
}