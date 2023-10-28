import { QueueProtocol } from "@/layers/use-cases";
import { QueueHelper } from "../helper";

export class QueueAdapter implements QueueProtocol {

	constructor(private readonly queueHelper: QueueHelper) { }

	async sendMessage(queue: string, object: object): Promise<void> {
		this.queueHelper.channel.sendToQueue(queue, Buffer.from(JSON.stringify(object)));
	}
}