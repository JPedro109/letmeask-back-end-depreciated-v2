export interface QueueProtocol {
    sendMessage(queue: string, object: object): Promise<void>;
}