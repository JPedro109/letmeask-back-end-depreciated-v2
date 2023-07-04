import { QueueProtocol } from "@/layers/use-cases";
import { QueueHelper } from "../helper";

export class QueueAdapter implements QueueProtocol {

	async sendMessage(queue: string, object: object): Promise<void> {
		QueueHelper.channel.sendToQueue(queue, Buffer.from(JSON.stringify(object)));
	}
}