import { HttpHelper, HttpProtocol, HttpRequest, HttpResponse,  RequestError, Validate } from "@/layers/presentation";
import { GetUsernameUseCaseProtocol } from "@/layers/domain";

export class GetUsernameController implements HttpProtocol {

	constructor(private readonly useCase: GetUsernameUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;

		const validation = Validate.fields([
			{ name: "id", type: "string" },
		],
		{ id }
		);

		if(!validation.valid) throw new RequestError(validation.errors);  

		const response = await this.useCase.execute({ id });

		return HttpHelper.ok(response);
	}
}