import { LogModel, LogRepositoryProtocol } from "@/layers/use-cases";
import { HttpProtocol, HttpRequest, HttpResponse } from "@/layers/presentation";

export class ControllerStub implements HttpProtocol {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handle(request: HttpRequest): Promise<HttpResponse> {
		throw new Error("Method not implemented.");
	}
}

export class LogRepositoryStub implements LogRepositoryProtocol {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async createLog(message: string, stack: string, name: string): Promise<LogModel> {
		return new LogModel("1", message, stack, name);
	}
}