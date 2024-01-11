import { LogProtocol } from "@/layers/domain";
import { HttpProtocol, HttpRequest, HttpResponse, ok } from "@/layers/presentation";

export class ControllerStub implements HttpProtocol {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async http(request: HttpRequest): Promise<HttpResponse> {
		return ok("test");
	}
}

export class LogFacadeStub implements LogProtocol {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	trace(title: string, message: string, trace: string): boolean {
		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	info(title: string, message: string): boolean {
		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	warning(title: string, message: string): boolean {
		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	error(title: string, message: string): boolean {
		return true;
	}
}