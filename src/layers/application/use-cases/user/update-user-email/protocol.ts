import { UpdateUserEmailDTO, UpdateUserEmailResponseDTO } from "./dtos";

export interface UpdateUserEmailUseCaseProtocol {
    execute(dto: UpdateUserEmailDTO): Promise<UpdateUserEmailResponseDTO>;
}