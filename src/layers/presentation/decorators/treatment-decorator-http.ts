import { Metrics } from "@/shared";
import { LogProtocol } from "@/layers/domain";
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
		let end: (arg: { route: string; code: string; method: string, controller: string; }) => void;

		try {
			end = Metrics.httpRequestTimer.startTimer();
			
			const { statusCode, response } = await this.controller.http(request);

			const log = { body: this.maskSensitiveBodyInformation(request.data), response, statusCode };

			if(request.userId) log["userId"] = request.userId;

			if(statusCode > 399 && statusCode <= 500 || response instanceof Error) {
				end({ route: request.path, code: "4XX", method: request.method, controller: this.controller.constructor.name });
				this.log.warning(`${request.path} - ${request.method} - ${this.controller.constructor.name}`, JSON.stringify(log));
			} else {
				end({ route: request.path, code: "2XX", method: request.method, controller: this.controller.constructor.name });
				this.log.info(`${request.path} - ${request.method} - ${this.controller.constructor.name}`, JSON.stringify(log));
			}

			return { statusCode, response };
		} catch(e) {
			const log = { body: this.maskSensitiveBodyInformation(request.data), error: e, statusCode: 500 };

			if(request.userId) log["userId"] = request.userId;

			end({ route: request.path, code: "5XX", method: request.method, controller: this.controller.constructor.name });

			this.log.error(`${request.path} - ${request.method} - ${this.controller.constructor.name}`, JSON.stringify(log));
			
			return serverError();
		}
	}
}