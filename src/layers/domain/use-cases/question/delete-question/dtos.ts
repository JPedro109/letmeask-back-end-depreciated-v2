import { QuestionModel, NotFoundError, UnauthorizedError } from "@/layers/domain";

export type DeleteQuestionDTO = {
    questionId: string;
    userId: string;
}

export type DeleteQuestionResponseDTO = QuestionModel | NotFoundError | UnauthorizedError;