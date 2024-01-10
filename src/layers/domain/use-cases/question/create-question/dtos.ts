import { InvalidQuestionDescriptionError } from "@/layers/domain";
import { QuestionModel, NotFoundError, UnauthorizedError } from "@/layers/domain";

export type CreateQuestionDTO = {
    userId: string;
    roomCode: string;
    question: string;
}

export type CreateQuestionResponseDTO = QuestionModel | InvalidQuestionDescriptionError | NotFoundError | UnauthorizedError;