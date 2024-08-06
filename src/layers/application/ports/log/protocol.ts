export interface LogProtocol {
    trace(message: string, trace: string): boolean;
    info(message: string): boolean;
    warning(message: string): boolean;
    error(message: string, error: Error): boolean;
}