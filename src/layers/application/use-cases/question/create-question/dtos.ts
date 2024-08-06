import { QuestionModel } from "@/layers/application";

export type CreateQuestionDTO = {
    userId: string;
    roomCode: string;
    question: string;
}

export type CreateQuestionResponseDTO = QuestionModel;