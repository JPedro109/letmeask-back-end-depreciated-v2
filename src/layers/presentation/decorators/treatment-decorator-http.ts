import { LogProtocol } from "@/layers/use-cases";
import { HttpProtocol, HttpRequest, HttpResponse } from "../ports";
import { serverError } from "../helpers";

export class TreatmentDecoratorHttp implements HttpProtocol {

	constructor(
		private readonly controller: HttpProtocol, 
		private readonly log: LogProtocol
	) { }

	private maskSensitiveBodyInformation(data: object) {
		for(const key in data) if(key.includes("password") || key.includes("Password")) data[key] = "********";

		return data;
	}

	async http(request: HttpRequest): Promise<HttpResponse> {
		try {
			const { statusCode, response } = await this.controller.http(request);

			const log = { body: this.maskSensitiveBodyInformation(request.data), response, statusCode };

			if(request.userId) log["userId"] = request.userId;

			if(statusCode > 399 && statusCode <= 500 || response instanceof Error) 
				this.log.warning(`${request.path} - ${request.method} - ${this.controller.constructor.name}`, JSON.stringify(log));
			else
				this.log.info(`${request.path} - ${request.method} - ${this.controller.constructor.name}`, JSON.stringify(log));

			return { statusCode, response };
		} catch(e) {
			const log = { body: this.maskSensitiveBodyInformation(request.data), error: e, statusCode: 500 };

			if(request.userId) log["userId"] = request.userId;

			this.log.error(`${request.path} - ${request.method} - ${this.controller.constructor.name}`, JSON.stringify(log));
			
			return serverError();
		}
	}
}