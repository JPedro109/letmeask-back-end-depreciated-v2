import { 
	QUEUE_NAME
} from "@/shared/env";
import { MailServiceProtocol, QueueProtocol } from "@/layers/use-cases";

export class MailServiceAdapter implements MailServiceProtocol {

	constructor(private readonly queue: QueueProtocol) { }

	async sendMail(to: string, subject: string, html: string, context?: object): Promise<void> {
		const email = {
			to,
			subject,
			template: html,
			context
		};

		await this.queue.sendMessage(QUEUE_NAME, email);
	}
}