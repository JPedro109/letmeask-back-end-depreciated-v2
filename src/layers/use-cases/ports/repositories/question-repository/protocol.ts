import { QuestionModel } from "./model";

export interface QuestionRepositoryProtocol {
    setContext(context: unknown): void;
    store(roomCode: string, question: string, userId: string): Promise<QuestionModel>;
    getById(id: string): Promise<QuestionModel | null>;
    getRoomByUserId(userId: string): Promise<QuestionModel[]>;
    deleteQuestionById(id: string): Promise<QuestionModel>;
}