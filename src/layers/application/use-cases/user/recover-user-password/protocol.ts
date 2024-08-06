import { RecoverUserPasswordDTO, RecoverUserPasswordResponseDTO } from "./dtos";

export interface RecoverUserPasswordUseCaseProtocol {
    execute(dto: RecoverUserPasswordDTO): Promise<RecoverUserPasswordResponseDTO>
}