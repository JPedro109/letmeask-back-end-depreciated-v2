import { 
	QUEUE_NAME
} from "@/shared/env";
import { MailProtocol, QueueProtocol } from "@/layers/use-cases";

export class MailAdapter implements MailProtocol {

	constructor(private readonly queue: QueueProtocol) { }

	async sendMail(to: string, subject: string, html: string, context?: object): Promise<void> {
		const email = {
			to,
			subject,
			template: html,
			context,
			service: "LETMEASK"
		};

		await this.queue.sendMessage(QUEUE_NAME, { pattern: "send_email", data: email });
	}
}