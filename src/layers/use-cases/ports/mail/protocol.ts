export interface MailServiceProtocol {
	sendMail(to: string, subject: string, html: string, context?: object): Promise<void>;
}