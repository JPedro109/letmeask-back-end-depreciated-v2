import { RecoverUserPasswordDTO, RecoverUserPasswordResponseDTO } from "./dtos";

export interface RecoverUserPasswordUseCaseProtocol {
    execute({ email, code, password, passwordConfirm }: RecoverUserPasswordDTO): Promise<RecoverUserPasswordResponseDTO>
}