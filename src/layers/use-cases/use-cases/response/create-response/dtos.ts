import { InvalidResponseDescriptionError } from "@/layers/entities";
import { ResponseModel, NotFoundError } from "@/layers/use-cases";

export type CreateResponseDTO = {
    userId: string;
    questionId: string;
    response: string;
}

export type CreateResponseResponseDTO = ResponseModel | InvalidResponseDescriptionError | NotFoundError;