import { HttpProtocol } from "../protocols";
import { HttpRequest, HttpResponse, LogRepositoryProtocol } from "../ports";
import { server } from "../helpers";

export class TreatmentDecorator implements HttpProtocol {

	constructor(private readonly controller: HttpProtocol, private readonly logRepository: LogRepositoryProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		try {
			return await this.controller.handle(request);
		} catch(e) {
			await this.logRepository.createLog(e.message, e.stack, e.name);
			return server();
		}
	}
}