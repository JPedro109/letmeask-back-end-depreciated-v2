import { HttpProtocol, HttpRequest, HttpResponse, Validate, InvalidRequestError, HttpHelper } from "@/layers/presentation";
import { CreateUserUseCaseProtocol } from "@/layers/domain";

export class CreateUserController implements HttpProtocol {

	constructor(private readonly useCase: CreateUserUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const { email, password, passwordConfirm, username } = request.data;

		const validation = Validate.fields(
			[
				{ name: "email", type: "string" }, 
				{ name: "username", type: "string" },
				{ name: "password", type: "string" }, 
				{ name: "passwordConfirm", type: "string" },
			], 
			{ email, password, passwordConfirm, username }
		);

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ email, username, password, passwordConfirm });

		return HttpHelper.created(response);
	}
}