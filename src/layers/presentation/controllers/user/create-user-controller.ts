import { HttpProtocol, HttpRequest, HttpResponse, badRequest, created, Validate } from "@/layers/presentation";
import { CreateUserUseCaseProtocol } from "@/layers/domain";

export class CreateUserController implements HttpProtocol {

	constructor(private readonly useCase: CreateUserUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const { email, password, passwordConfirm, username } = request.data;

		const validation = Validate.fields(
			[
				{ name: "email", type: "string" }, 
				{ name: "username", type: "string" },
				{ name: "password", type: "string" }, 
				{ name: "passwordConfirm", type: "string" },
			], 
			{ email, password, passwordConfirm, username }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ email, username, password, passwordConfirm });

		if(response instanceof Error) return badRequest(response);

		return created(response);
	}
}