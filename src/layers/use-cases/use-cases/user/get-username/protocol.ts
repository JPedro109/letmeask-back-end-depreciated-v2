import { GetUsernameDTO, GetUsernameResponseDTO } from "./dtos";

export interface GetUsernameUseCaseProtocol {
    execute({ id }: GetUsernameDTO): Promise<GetUsernameResponseDTO>;
}