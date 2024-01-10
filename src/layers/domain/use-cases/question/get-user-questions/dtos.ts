import { QuestionModel } from "@/layers/domain";

export type GetUserQuestionsDTO = {
    userId: string;
}

export type GetUserQuestionsResponseDTO = QuestionModel[];