import { HttpHelper, HttpProtocol, HttpRequest, HttpResponse, InvalidRequestError, Validate } from "@/layers/presentation";
import { UpdateUsernameUseCaseProtocol } from "@/layers/domain";

export class UpdateUsernameController implements HttpProtocol {

	constructor(private readonly useCase: UpdateUsernameUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;

		const { username } = request.data;

		const validation = Validate.fields([
			{ name: "id", type: "string" },
			{ name: "username", type: "string" }
		],
		{ id, username });

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ id, username });

		return HttpHelper.ok(response);
	}
}