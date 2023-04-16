import {
	UserRepositoryProtocol,
	QuestionRepositoryProtocol,
	ResponseRepositoryProtocol,
	RoomRepositoryProtocol,
	UserVerificationCodeRepositoryProtocol
} from "@/layers/use-cases";

export interface UnitOfWorkProtocol {
    transaction(querys: () => Promise<void>): Promise<void>;
    getUserRepository(): UserRepositoryProtocol;
    getRoomRepository(): RoomRepositoryProtocol;
    getQuestionRepository(): QuestionRepositoryProtocol;
    getResponseRepository(): ResponseRepositoryProtocol;
    getUserVerificationCodeRepository(): UserVerificationCodeRepositoryProtocol;
}