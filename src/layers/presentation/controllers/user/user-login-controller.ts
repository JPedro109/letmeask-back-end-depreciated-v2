import { HttpProtocol, HttpRequest, HttpResponse, HttpHelper, Validate, InvalidRequestError  } from "@/layers/presentation";
import { UserLoginUseCaseProtocol } from "@/layers/application";

export class UserLoginController implements HttpProtocol {

	constructor(private readonly useCase: UserLoginUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const { email, password } = request.data;

		const validation = Validate.fields(
			[
				{ name: "email", type: "string" }, 
				{ name: "password", type: "string" },
			], 
			{ email, password }
		);

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  		

		const response = await this.useCase.execute({ email, password });

		return HttpHelper.ok(response);
	}
}