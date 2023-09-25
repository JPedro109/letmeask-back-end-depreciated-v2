/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { 
	GenerationProtocol, 
	CacheProtocol,
	UserRepositoryProtocol, 
	CryptographyProtocol,
	MailServiceProtocol, 
	AuthenticationProtocol, 
	JsonWebTokenType, 
	UserModel, 
	RoomRepositoryProtocol, 
	RoomModel,
	QuestionRepositoryProtocol,
	QuestionModel,
	ResponseRepositoryProtocol,
	ResponseModel,
	UserVerificationCodeRepositoryProtocol,
	UnitOfWorkProtocol,
	UserVerificationCodeModel
} from "@/layers/use-cases";

import { testQuestionModel, testResponseModel, testRoomModel, testUserModel, testUserVerificationCodeModel } from "../datas";

export class UserRepositoryStub implements UserRepositoryProtocol {
	setContext(context: unknown): void {}

	async createUser(email: string, hashPassword: string): Promise<UserModel> {
		return testUserModel;
	}

	async getUserById(id: string): Promise<UserModel | null> {
		return testUserModel;
	}

	async getUserByEmail(email: string): Promise<UserModel | null> {
		return null;
	}

	async getUserByIdWithVerificationCode(id: string, verificationCode: string): Promise<UserModel> {
		return testUserModel;
	}
	
	async getUserByEmailWithVerificationCode(email: string, verificationCode: string): Promise<UserModel> {
		return null;
	}

	async updateUserById(id: string, data: Partial<UserModel>): Promise<UserModel> {
		return testUserModel;
	}

	async updateUserByEmail(email: string, data: Partial<UserModel>): Promise<UserModel> {
		return testUserModel;
	}

	async deleteUserById(id: string): Promise<UserModel> {
		return testUserModel;
	}
}

export class RoomRepositoryStub implements RoomRepositoryProtocol {
	setContext(context: unknown): void {}
		
	async createRoom(code: string, roomName: string, userId: string): Promise<RoomModel> {
		return testRoomModel;
	}

	async getRoomByCode(code: string): Promise<RoomModel> {
		return testRoomModel;
	}

	async getRoomByUserId(userId: string): Promise<RoomModel> {
		return testRoomModel;
	}

	async getCodeByUserId(userId: string): Promise<string> {
		return testRoomModel.code;
	}

	async roomExists(code: string): Promise<boolean> {
		return true;
	}

	async deleteRoomByCode(code: string): Promise<RoomModel> {
		return testRoomModel;
	}
}

export class QuestionRepositoryStub implements QuestionRepositoryProtocol {

	setContext(context: unknown): void {}
		
	async store(roomCode: string, question: string, userId: string): Promise<QuestionModel> {
		return testQuestionModel;
	}

	async getById(id: string): Promise<QuestionModel> {
		return testQuestionModel;
	}

	async getRoomByUserId(userId: string): Promise<QuestionModel[]> {
		return [testQuestionModel];
	}

	async deleteQuestionById(id: string): Promise<QuestionModel> {
		return testQuestionModel;
	}
}

export class ResponseRepositoryStub implements ResponseRepositoryProtocol {
	setContext(context: unknown): void {}
		
	async createResponse(questionId: string, response: string): Promise<ResponseModel> {
		return testResponseModel;
	}
}

export class UserVerificationCodeRepositoryStub implements UserVerificationCodeRepositoryProtocol {
	setContext(context: unknown): void {}

	async createUserVerificationCode(
		verificationCode: string, 
		verificationCodeExpiryDate: number, 
		passwordRecovery: boolean, 
		userId: string
	): Promise<UserVerificationCodeModel> {
		return testUserVerificationCodeModel;
	}
	
	async invalidateUserValidationCode(verificationCode: string): Promise<UserVerificationCodeModel> {
		return testUserVerificationCodeModel;
	}

}

export class UnitOfWorkStub implements UnitOfWorkProtocol {
	constructor(
        private readonly userRepository: UserRepositoryProtocol,
        private readonly roomRepository: RoomRepositoryProtocol,
        private readonly questionRepository: QuestionRepositoryProtocol,
        private readonly responseRepository: ResponseRepositoryProtocol,
        private readonly userVerificationCodeRepository: UserVerificationCodeRepositoryProtocol,
	) { }

	async transaction(querys: () => Promise<void>) {
		await querys();
	}
    
	getUserRepository(): UserRepositoryProtocol  {
		return this.userRepository;
	}

	getRoomRepository(): RoomRepositoryProtocol  {
		return this.roomRepository;
	}

	getQuestionRepository(): QuestionRepositoryProtocol  {
		return this.questionRepository;
	}

	getResponseRepository(): ResponseRepositoryProtocol  {
		return this.responseRepository;
	}

	getUserVerificationCodeRepository(): UserVerificationCodeRepositoryProtocol {
		return this.userVerificationCodeRepository;
	}
}

export class MailServiceStub implements MailServiceProtocol {
	async sendMail(to: string, subject: string, html: string, context?: object): Promise<void> { 
	}
}

export class CryptographyStub implements CryptographyProtocol {
	async hash(value: string): Promise<string> {
		return "hash";
	}
	
	async compareHash(hashValue: string, valueToBeCompared: string): Promise<boolean> {
		return true;
	}
}

export class JsonWebTokenStub implements AuthenticationProtocol {
	createJsonWebToken(payload: object, expiryTimeInSeconds: number): string {
		return "jwt";
	}

	verifyJsonWebToken(token: string): JsonWebTokenType {
		return {
			id: "1",
			email: "email@test.com"
		};
	}
}

export class GenerationStub implements GenerationProtocol {
	code(): string {
		return "code";
	}

	codeExpirationDate(timeInMinutes: number): number {
		return 1;
	}
}

export class CacheStub implements CacheProtocol {

	set<Type>(key: string, value: Type, expiryTimeInSeconds?: number): void {
		return;
	}

	get<Type>(key: string): Type {
		return null;
	}

	del(key: string): void {
		return;
	}
}