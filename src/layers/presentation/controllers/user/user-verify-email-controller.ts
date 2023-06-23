import { HttpProtocol, HttpRequest, HttpResponse, badRequest, notFound, ok, unauthorized, Validate } from "@/layers/presentation";
import { NotFoundError, UnauthorizedError, UserVerifyEmailUseCaseProtocol } from "@/layers/use-cases";

export class UserVerifyEmailController implements HttpProtocol {

	constructor(private readonly useCase: UserVerifyEmailUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const { email, code } = request.data;

		const validation = Validate.fields(
			[
				{ name: "email", type: "string" }, 
				{ name: "code", type: "string" },
			], 
			{ email, code }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ email, code });

		if(response instanceof NotFoundError) return notFound(response);

		if(response instanceof UnauthorizedError) return unauthorized(response);

		if(response instanceof Error) return badRequest(response);

		return ok(response);
	}
}