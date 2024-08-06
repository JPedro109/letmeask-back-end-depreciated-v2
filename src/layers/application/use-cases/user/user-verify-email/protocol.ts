import { UserVerifyEmailDTO, UserVerifyEmailResponseDTO } from "./dtos";

export interface UserVerifyEmailUseCaseProtocol {
    execute(dto: UserVerifyEmailDTO): Promise<UserVerifyEmailResponseDTO>;
}