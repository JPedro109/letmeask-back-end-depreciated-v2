import { GetUsernameDTO, GetUsernameResponseDTO } from "./dtos";

export interface GetUsernameUseCaseProtocol {
    execute(dto: GetUsernameDTO): Promise<GetUsernameResponseDTO>;
}