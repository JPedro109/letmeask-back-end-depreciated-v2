import { QuestionModel } from "@/layers/application";

export type DeleteQuestionDTO = {
    questionId: string;
    userId: string;
}

export type DeleteQuestionResponseDTO = QuestionModel;