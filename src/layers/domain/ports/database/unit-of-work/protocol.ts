import {
	UserRepositoryProtocol,
	QuestionRepositoryProtocol,
	ResponseRepositoryProtocol,
	RoomRepositoryProtocol,
	UserVerificationCodeRepositoryProtocol
} from "@/layers/domain";

export interface UnitOfWorkProtocol {
    transaction(querys: () => Promise<void>): Promise<void>;
    getUserRepository(): UserRepositoryProtocol;
    getRoomRepository(): RoomRepositoryProtocol;
    getQuestionRepository(): QuestionRepositoryProtocol;
    getResponseRepository(): ResponseRepositoryProtocol;
    getUserVerificationCodeRepository(): UserVerificationCodeRepositoryProtocol;
}