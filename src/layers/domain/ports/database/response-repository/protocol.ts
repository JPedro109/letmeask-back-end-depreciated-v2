import { ResponseModel } from "./model";

export interface ResponseRepositoryProtocol {
    setContext(context: unknown): void;
    createResponse(questionId: string, response: string): Promise<ResponseModel>;
}