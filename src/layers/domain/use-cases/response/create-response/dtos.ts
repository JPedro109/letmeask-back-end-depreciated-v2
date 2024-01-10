import { InvalidResponseDescriptionError } from "@/layers/domain";
import { ResponseModel, NotFoundError } from "@/layers/domain";

export type CreateResponseDTO = {
    userId: string;
    questionId: string;
    response: string;
}

export type CreateResponseResponseDTO = ResponseModel | InvalidResponseDescriptionError | NotFoundError;