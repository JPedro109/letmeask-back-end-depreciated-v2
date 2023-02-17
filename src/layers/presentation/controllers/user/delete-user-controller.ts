import { HttpProtocol, HttpRequest, HttpResponse, badRequest, notFound, ok, Validate } from "@/layers/presentation";
import { DeleteUserUseCaseProtocol, NotFoundError } from "@/layers/use-cases";

export class DeleteUserController implements HttpProtocol {

	constructor(private readonly useCase: DeleteUserUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;		

		const { password, passwordConfirm } = request.body;

		const validation = Validate.fields(
			[
				{ name: "id", type: "string" }, 
				{ name: "password", type: "string" }, 
				{ name: "passwordConfirm", type: "string" }
			], 
			{ id, password, passwordConfirm }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ id, password, passwordConfirm });

		if(response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response);

		return ok(response);
	}
}