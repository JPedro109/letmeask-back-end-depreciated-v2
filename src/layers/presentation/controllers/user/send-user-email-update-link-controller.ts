import { HttpProtocol, HttpRequest, HttpResponse, HttpHelper, Validate, InvalidRequestError } from "@/layers/presentation";
import { SendUserEmailUpdateLinkUseCaseProtocol } from "@/layers/domain";

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

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ id, email });

		return HttpHelper.ok(response);
	}
}