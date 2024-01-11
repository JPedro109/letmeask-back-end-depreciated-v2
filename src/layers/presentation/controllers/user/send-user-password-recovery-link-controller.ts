import { HttpProtocol, HttpRequest, HttpResponse, ok, Validate, RequestError } from "@/layers/presentation";
import { SendUserPasswordRecoveryLinkUseCaseProtocol } from "@/layers/domain";

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

		if(!validation.valid) throw new RequestError(validation.errors);  

		const response = await this.useCase.execute({ email });

		return ok(response);
	}
}