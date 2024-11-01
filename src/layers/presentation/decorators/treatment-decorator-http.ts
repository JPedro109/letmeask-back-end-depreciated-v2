import { DomainError } from "@/layers/domain";
import { InvalidParamError, LogProtocol, NotFoundError, UnauthorizedError } from "@/layers/application";
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
		try {
			const { statusCode, response } = await this.controller.http(request);

			this.log.info(
				`${request.path} ${request.method} ${statusCode} ${this.controller.constructor.name} | Operation completed successfully`
			);

			return { statusCode, response };
		} catch(e) {
			const { statusCode, response } = this.setErrorStatusCode(e);
			
			if(statusCode !== 500) {
				this.log.warning(`${request.path} ${request.method} ${statusCode} ${this.controller.constructor.name} | ${e.message}`);
			} else {
				this.log.error(`${request.path} ${request.method} ${statusCode} ${this.controller.constructor.name}`, e);
			}

			return { statusCode, response };
		}
	}
}