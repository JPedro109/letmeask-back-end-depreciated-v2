import { MailProtocol, QueueProtocol, SecretsEnum, SecretsProtocol } from "@/layers/application";

export class MailAdapter implements MailProtocol {

	constructor(
		private readonly queue: QueueProtocol,
		private readonly secrets: SecretsProtocol
	) { }

	async sendMail(to: string, subject: string, html: string, context?: object): Promise<void> {
		const email = {
			to,
			subject,
			template: html,
			context,
			service: "LETMEASK"
		};

		await this.queue.sendMessage(this.secrets.getRequiredSecret(SecretsEnum.QueueName), { pattern: "send_email", data: email });
	}
}