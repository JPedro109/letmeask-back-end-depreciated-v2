import { SendUserPasswordRecoveryLinkDTO, SendUserPasswordRecoveryLinkResponseDTO } from "./dtos";

export interface SendUserPasswordRecoveryLinkUseCaseProtocol {
    execute({ email }: SendUserPasswordRecoveryLinkDTO): Promise<SendUserPasswordRecoveryLinkResponseDTO>;
}