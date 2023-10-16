import { LogProtocol } from "@/layers/use-cases";
import { HttpProtocol, HttpRequest, HttpResponse } from "@/layers/presentation";

export class ControllerStub implements HttpProtocol {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	http(request: HttpRequest): Promise<HttpResponse> {
		throw new Error("Method not implemented.");
	}
}

export class LogAdapterStub implements LogProtocol {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	trace(title: string, message: string, trace: string): boolean {
		throw new Error("Method not implemented.");
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