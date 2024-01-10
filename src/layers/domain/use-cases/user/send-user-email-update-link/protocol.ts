import { SendUserEmailUpdateLinkDTO, SendUserEmailUpdateLinkResponseDTO } from "./dtos";

export interface SendUserEmailUpdateLinkUseCaseProtocol {
    execute({ id, email }: SendUserEmailUpdateLinkDTO): Promise<SendUserEmailUpdateLinkResponseDTO>;
}