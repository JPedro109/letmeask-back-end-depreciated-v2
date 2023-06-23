import { HttpProtocol, HttpRequest, HttpResponse, badRequest, ok, unauthorized, Validate  } from "@/layers/presentation";
import { UserLoginUseCaseProtocol } from "@/layers/use-cases";

export class UserLoginController implements HttpProtocol {

	constructor(private readonly useCase: UserLoginUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const { email, password } = request.data;

		const validation = Validate.fields(
			[
				{ name: "email", type: "string" }, 
				{ name: "password", type: "string" },
			], 
			{ email, password }
		);

		if(validation instanceof Error) return badRequest(validation); 		

		const response = await this.useCase.execute({ email, password });

		if(response instanceof Error) return unauthorized(response);

		return ok(response);
	}
}