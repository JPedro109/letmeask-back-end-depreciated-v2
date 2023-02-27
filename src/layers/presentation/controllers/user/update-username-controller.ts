import { NotFoundError, UpdateUsernameUseCaseProtocol } from "@/layers/use-cases";
import { HttpProtocol, HttpRequest, HttpResponse, badRequest, notFound, ok, Validate } from "@/layers/presentation";

export class UpdateUsernameController implements HttpProtocol {

	constructor(private readonly useCase: UpdateUsernameUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;

		const { username } = request.body;

		const validation = Validate.fields([
			{ name: "id", type: "string" },
			{ name: "username", type: "string" }
		],
		{ id, username });

		if(validation instanceof Error) return badRequest(validation);

		const response = await this.useCase.execute({ id, username });

		if(response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response);

		return ok(response);
	}
}