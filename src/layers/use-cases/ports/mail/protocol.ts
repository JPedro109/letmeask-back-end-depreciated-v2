export interface MailProtocol {
	sendMail(to: string, subject: string, html: string, context?: object): Promise<void>;
}