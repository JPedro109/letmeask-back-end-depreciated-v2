import { HttpProtocol, HttpRequest, HttpResponse, badRequest, notFound, ok, Validate } from "@/layers/presentation";
import { NotFoundError, SendUserPasswordRecoveryLinkUseCaseProtocol } from "@/layers/domain";

export class SendUserPasswordRecoveryLinkController implements HttpProtocol {

	constructor(private readonly useCase: SendUserPasswordRecoveryLinkUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const { email } = request.data;

		const validation = Validate.fields(
			[
				{ name: "email", type: "string" }, 
			], 
			{ email }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ email });

		if(response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response);

		return ok(response);
	}
}