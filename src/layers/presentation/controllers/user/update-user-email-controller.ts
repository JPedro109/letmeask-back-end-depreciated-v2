import { HttpProtocol, HttpRequest, HttpResponse, badRequest, ok, Validate } from "@/layers/presentation";
import { UpdateUserEmailUseCaseProtocol } from "@/layers/use-cases";

export class UpdateUserEmailController implements HttpProtocol {

	constructor(private readonly useCase: UpdateUserEmailUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;

		const { email, code } = request.query;

		const validation = Validate.fields(
			[
				{ name: "id", type: "string" }, 
				{ name: "email", type: "string" }, 
				{ name: "code", type: "string" }
			], 
			{ id, email, code }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ id, email, code });

		if(response instanceof Error) return badRequest(response);

		return ok(response);
	}
}