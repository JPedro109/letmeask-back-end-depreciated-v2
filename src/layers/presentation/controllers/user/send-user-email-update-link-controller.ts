import { HttpProtocol, HttpRequest, HttpResponse, badRequest, ok, Validate } from "@/layers/presentation";
import { SendUserEmailUpdateLinkUseCaseProtocol } from "@/layers/use-cases";

export class SendUserEmailUpdateLinkController implements HttpProtocol {

	constructor(private readonly useCase: SendUserEmailUpdateLinkUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;

		const { email } = request.data;

		const validation = Validate.fields(
			[
				{ name: "id", type: "string" }, 
				{ name: "email", type: "string" }, 
			], 
			{ id, email }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ id, email });

		if(response instanceof Error) return badRequest(response);

		return ok(response);
	}
}