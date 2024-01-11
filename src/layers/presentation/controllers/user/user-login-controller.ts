import { HttpProtocol, HttpRequest, HttpResponse, HttpHelper, Validate, RequestError  } from "@/layers/presentation";
import { UserLoginUseCaseProtocol } from "@/layers/domain";

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

		if(!validation.valid) throw new RequestError(validation.errors);  		

		const response = await this.useCase.execute({ email, password });

		return HttpHelper.ok(response);
	}
}