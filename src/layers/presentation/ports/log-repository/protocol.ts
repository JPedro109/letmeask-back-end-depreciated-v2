import { LogModel } from "./model";

export interface LogRepositoryProtocol {
    createLog(message: string, stack: string, name: string): Promise<LogModel>;
}