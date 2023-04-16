import { QuestionModel } from "@/layers/use-cases";

export type GetUserQuestionsDTO = {
    userId: string;
}

export type GetUserQuestionsResponseDTO = QuestionModel[];