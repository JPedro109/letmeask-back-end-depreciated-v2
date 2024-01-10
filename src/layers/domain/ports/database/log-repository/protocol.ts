import { LogModel } from "./model";

export interface LogRepositoryProtocol {
    createLog(level: string, title: string, message: string, trace?: string): Promise<LogModel>;
}