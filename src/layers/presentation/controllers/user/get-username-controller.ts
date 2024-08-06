import { HttpHelper, HttpProtocol, HttpRequest, HttpResponse,  InvalidRequestError, Validate } from "@/layers/presentation";
import { GetUsernameUseCaseProtocol } from "@/layers/application";

export class GetUsernameController implements HttpProtocol {

	constructor(private readonly useCase: GetUsernameUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;

		const validation = Validate.fields([
			{ name: "id", type: "string" },
		],
		{ id }
		);

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ id });

		return HttpHelper.ok(response);
	}
}