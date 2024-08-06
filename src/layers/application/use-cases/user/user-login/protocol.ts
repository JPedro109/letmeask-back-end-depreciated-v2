import { UserLoginDTO, UserLoginResponseDTO } from "./dtos";

export interface UserLoginUseCaseProtocol {
    execute(dto: UserLoginDTO): Promise<UserLoginResponseDTO>;
}