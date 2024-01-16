import { ResponseModel } from "@/layers/application";

export type CreateResponseDTO = {
    userId: string;
    questionId: string;
    response: string;
}

export type CreateResponseResponseDTO = ResponseModel;