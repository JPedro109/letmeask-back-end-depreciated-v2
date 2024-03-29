import { Metrics } from "@/shared";
import { DomainError, InvalidParamError, LogProtocol, NotFoundError, UnauthorizedError } from "@/layers/domain";
import { 
	HttpHelper,
	HttpProtocol, 
	HttpRequest, 
	HttpResponse, 
	InvalidRequestError
} from "@/layers/presentation";

export class TreatmentDecoratorHttp implements HttpProtocol {

	constructor(
		private readonly controller: HttpProtocol, 
		private readonly log: LogProtocol
	) { }

	private setErrorStatusCode(e: Error) {
		if(e instanceof UnauthorizedError) return HttpHelper.unauthorized(e);
		if(e instanceof NotFoundError) return HttpHelper.notFound(e);
		if(e instanceof DomainError || e instanceof InvalidRequestError || e instanceof InvalidParamError) return HttpHelper.badRequest(e);
		return HttpHelper.serverError();
	}

	async http(request: HttpRequest): Promise<HttpResponse> {
		let end: (arg: { route: string; code: string; method: string, controller: string; }) => void;

		try {
			end = Metrics.httpRequestTimer.startTimer();
			
			const { statusCode, response } = await this.controller.http(request);

			const log = { response, statusCode };

			if(request.userId) log["userId"] = request.userId;

			end({ route: request.path, code: "2XX", method: request.method, controller: this.controller.constructor.name });

			this.log.info(`${request.path} - ${request.method} - ${this.controller.constructor.name}`, JSON.stringify(log));

			return { statusCode, response };
		} catch(e) {
			const { statusCode, response } = this.setErrorStatusCode(e);
			
			const log = { error: e, statusCode };

			if(request.userId) log["userId"] = request.userId;

			if(statusCode !== 500) {
				end({ route: request.path, code: "4XX", method: request.method, controller: this.controller.constructor.name });
				this.log.warning(`${request.path} - ${request.method} - ${this.controller.constructor.name}`, JSON.stringify(log));
			} else {
				end({ route: request.path, code: "5XX", method: request.method, controller: this.controller.constructor.name });
				this.log.error(`${request.path} - ${request.method} - ${this.controller.constructor.name}`, JSON.stringify(log));
			}

			return { statusCode, response };
		}
	}
}