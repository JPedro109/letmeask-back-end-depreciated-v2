import { HttpHelper, HttpProtocol, HttpRequest, HttpResponse, InvalidRequestError, Validate } from "@/layers/presentation";
import { UpdateUserEmailUseCaseProtocol } from "@/layers/application";

export class UpdateUserEmailController implements HttpProtocol {

	constructor(private readonly useCase: UpdateUserEmailUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;

		const { email, code } = request.data;

		const validation = Validate.fields(
			[
				{ name: "id", type: "string" }, 
				{ name: "email", type: "string" }, 
				{ name: "code", type: "string" }
			], 
			{ id, email, code }
		);

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ id, email, code });

		return HttpHelper.ok(response);
	}
}