import { UserVerificationCodeModel } from "./model";

export interface UserVerificationCodeRepositoryProtocol {
    setContext(context: unknown): void;
    createUserVerificationCode(
        verificationCode: string, 
        verificationCodeExpiryDate: number,
        passwordRecovery: boolean,
        userId: string): Promise<UserVerificationCodeModel>;
    invalidateUserValidationCode(verificationCode: string): Promise<UserVerificationCodeModel>;
}