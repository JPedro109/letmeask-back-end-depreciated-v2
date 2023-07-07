import { UserModel } from "./model";

export interface UserRepositoryProtocol {

    setContext(context: unknown): void;    
    createUser(email: string, username: string, hashPassword: string): Promise<UserModel>;
    getUserById(id: string): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel| null>;
    getUserByIdWithVerificationCode(id: string, verificationCode: string, passwordRecoveryCode: boolean): Promise<UserModel | null>;
    getUserByEmailWithVerificationCode(email: string, verificationCode: string, passwordRecoveryCode: boolean): Promise<UserModel | null>;
    updateUserById(id: string, data: Partial<UserModel>): Promise<UserModel>;
    updateUserByEmail(email: string, data: Partial<UserModel>): Promise<UserModel>;
    deleteUserById(id: string): Promise<UserModel>;
}