import { HttpProtocol, HttpRequest, HttpResponse, badRequest, notFound, ok, Validate } from "@/layers/presentation";
import { NotFoundError, RecoverUserPasswordUseCaseProtocol } from "@/layers/domain";

export class RecoverUserPasswordController implements HttpProtocol {

	constructor(private readonly useCase: RecoverUserPasswordUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const { email, code, password, passwordConfirm } = request.data;

		const validation = Validate.fields(
			[
				{ name: "email", type: "string" }, 
				{ name: "code", type: "string" }, 
				{ name: "password", type: "string" }, 
				{ name: "passwordConfirm", type: "string" }
			], 
			{ email, code, password, passwordConfirm }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ email, code, password, passwordConfirm });

		if(response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response);

		return ok(response);
	}
}