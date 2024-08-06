import { SendUserEmailUpdateLinkDTO, SendUserEmailUpdateLinkResponseDTO } from "./dtos";

export interface SendUserEmailUpdateLinkUseCaseProtocol {
    execute(dto: SendUserEmailUpdateLinkDTO): Promise<SendUserEmailUpdateLinkResponseDTO>;
}