export interface LogProtocol {
    trace(title: string, message: string, trace: string): boolean;
    info(title: string, message: string): boolean;
    warning(title: string, message: string): boolean;
    error(title: string, message: string): boolean;
}