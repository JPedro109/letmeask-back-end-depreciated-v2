import { SendUserPasswordRecoveryLinkDTO, SendUserPasswordRecoveryLinkResponseDTO } from "./dtos";

export interface SendUserPasswordRecoveryLinkUseCaseProtocol {
    execute(dto: SendUserPasswordRecoveryLinkDTO): Promise<SendUserPasswordRecoveryLinkResponseDTO>;
}