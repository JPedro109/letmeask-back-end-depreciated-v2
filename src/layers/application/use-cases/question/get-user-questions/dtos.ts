import { QuestionModel } from "@/layers/application";

export type GetUserQuestionsDTO = {
    userId: string;
}

export type GetUserQuestionsResponseDTO = QuestionModel[];