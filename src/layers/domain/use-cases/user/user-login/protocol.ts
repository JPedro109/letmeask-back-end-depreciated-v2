import { UserLoginDTO, UserLoginResponseDTO } from "./dtos";

export interface UserLoginUseCaseProtocol {
    execute({ email, password }: UserLoginDTO): Promise<UserLoginResponseDTO>;
}