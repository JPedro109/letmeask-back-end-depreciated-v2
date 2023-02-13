import { QuestionModel, NotFoundError, UnauthorizedError } from "@/layers/use-cases";

export type DeleteQuestionDTO = {
    questionId: string;
    userId: string;
}

export type DeleteQuestionResponseDTO = QuestionModel | NotFoundError | UnauthorizedError;