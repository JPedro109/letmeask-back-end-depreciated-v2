import { UpdateUsernameDTO, UpdateUsernameResponseDTO } from "./dtos";

export interface UpdateUsernameUseCaseProtocol {
    execute({ username }: UpdateUsernameDTO): Promise<UpdateUsernameResponseDTO>;
}