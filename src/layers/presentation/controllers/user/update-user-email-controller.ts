import { HttpProtocol, HttpRequest, HttpResponse, ok, RequestError, Validate } from "@/layers/presentation";
import { UpdateUserEmailUseCaseProtocol } from "@/layers/domain";

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

		if(!validation.valid) throw new RequestError(validation.errors);  

		const response = await this.useCase.execute({ id, email, code });

		return ok(response);
	}
}