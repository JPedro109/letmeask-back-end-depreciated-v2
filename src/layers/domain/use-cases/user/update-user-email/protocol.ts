import { UpdateUserEmailDTO, UpdateUserEmailResponseDTO } from "./dtos";

export interface UpdateUserEmailUseCaseProtocol {
    execute({ id, email, code }: UpdateUserEmailDTO): Promise<UpdateUserEmailResponseDTO>;
}