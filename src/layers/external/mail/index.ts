import { 
	EMAIL_PROVIDER_EMAIL, 
	HOST_PROVIDER_EMAIL, 
	PASSWORD_PROVIDER_EMAIL, 
	PORT_PROVIDER_EMAIL
} from "@/shared/env";
import { MailServiceProtocol } from "@/layers/use-cases";

import path from "path";

import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";

export class MailServiceAdapter implements MailServiceProtocol {

	private readonly mail: Transporter<SentMessageInfo>;
	private readonly email: string = EMAIL_PROVIDER_EMAIL;
	private readonly password: string = PASSWORD_PROVIDER_EMAIL;
	private readonly host: string = HOST_PROVIDER_EMAIL;
	private readonly port: number = PORT_PROVIDER_EMAIL;
	private readonly ssl = false;
	private readonly emailBodiesPath = "./src/layers/external/mail/bodies";

	constructor() {

		this.mail = nodemailer.createTransport({
			host: this.host,
			port: this.port,
			secure: this.ssl,
			auth: { user: this.email, pass: this.password }
		}).use("compile", hbs({
			viewEngine: {
				defaultLayout: null,
				partialsDir: path.resolve(this.emailBodiesPath)
			},
			viewPath: path.resolve(this.emailBodiesPath),
			extName: ".html"
		}));

	}

	async sendMail(to: string, subject: string, html: string, context?: object): Promise<void> {
		const email = {
			from: this.email,
			to,
			subject,
			template: html,
			context
		};

		await this.mail.sendMail(email);
	}
}