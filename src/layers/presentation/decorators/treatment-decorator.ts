import { LogRepositoryProtocol } from "@/layers/use-cases";
import { HttpProtocol } from "../ports";
import { HttpRequest, HttpResponse } from "../ports";
import { server } from "../helpers";

export class TreatmentDecorator implements HttpProtocol {

	constructor(private readonly controller: HttpProtocol, private readonly logRepository: LogRepositoryProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		try {
			return await this.controller.http(request);
		} catch(e) {
			await this.logRepository.createLog(e.message, e.stack, e.name);
			return server();
		}
	}
}