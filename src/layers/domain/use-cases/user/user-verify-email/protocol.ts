import { UserVerifyEmailDTO, UserVerifyEmailResponseDTO } from "./dtos";

export interface UserVerifyEmailUseCaseProtocol {
    execute({ email, code }: UserVerifyEmailDTO): Promise<UserVerifyEmailResponseDTO>;
}