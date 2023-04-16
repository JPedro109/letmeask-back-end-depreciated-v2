import { InvalidQuestionDescriptionError } from "@/layers/entities";
import { QuestionModel, NotFoundError, UnauthorizedError } from "@/layers/use-cases";

export type CreateQuestionDTO = {
    userId: string;
    roomCode: string;
    question: string;
}

export type CreateQuestionResponseDTO = QuestionModel | InvalidQuestionDescriptionError | NotFoundError | UnauthorizedError;