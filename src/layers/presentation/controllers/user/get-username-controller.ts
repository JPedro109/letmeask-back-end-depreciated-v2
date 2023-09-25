import { NotFoundError, GetUsernameUseCaseProtocol } from "@/layers/use-cases";
import { HttpProtocol, HttpRequest, HttpResponse, badRequest, notFound, ok, Validate } from "@/layers/presentation";

export class GetUsernameController implements HttpProtocol {

	constructor(private readonly useCase: GetUsernameUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;

		const validation = Validate.fields([
			{ name: "id", type: "string" },
		],
		{ id });

		if(validation instanceof Error) return badRequest(validation);

		const response = await this.useCase.execute({ id });

		if(response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response);

		return ok(response);
	}
}