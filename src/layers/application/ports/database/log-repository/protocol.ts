import { LogModel } from "./model";

export interface LogRepositoryProtocol {
    createLog(level: string, message: string, error?: Error, trace?: string): Promise<LogModel>;
}