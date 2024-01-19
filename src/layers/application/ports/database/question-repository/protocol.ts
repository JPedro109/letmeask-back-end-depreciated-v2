import { QuestionModel } from "./model";

export interface QuestionRepositoryProtocol {
    setContext(context: unknown): void;
    store(roomCode: string, question: string, userId: string): Promise<QuestionModel>;
    getQuestionById(id: string): Promise<QuestionModel | null>;
    getQuestionsByUserId(userId: string): Promise<QuestionModel[]>;
    deleteQuestionById(id: string): Promise<QuestionModel>;
}