import { HttpProtocol, HttpRequest, HttpResponse, HttpHelper, Validate, InvalidRequestError } from "@/layers/presentation";
import { SendUserPasswordRecoveryLinkUseCaseProtocol } from "@/layers/application";

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

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ email });

		return HttpHelper.ok(response);
	}
}