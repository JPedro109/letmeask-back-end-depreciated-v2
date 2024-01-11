import { HttpProtocol, HttpRequest, HttpResponse, HttpHelper, Validate, RequestError } from "@/layers/presentation";
import { RecoverUserPasswordUseCaseProtocol } from "@/layers/domain";

export class RecoverUserPasswordController implements HttpProtocol {

	constructor(private readonly useCase: RecoverUserPasswordUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const { email, code, password, passwordConfirm } = request.data;

		const validation = Validate.fields(
			[
				{ name: "email", type: "string" }, 
				{ name: "code", type: "string" }, 
				{ name: "password", type: "string" }, 
				{ name: "passwordConfirm", type: "string" }
			], 
			{ email, code, password, passwordConfirm }
		);

		if(!validation.valid) throw new RequestError(validation.errors);  

		const response = await this.useCase.execute({ email, code, password, passwordConfirm });

		return HttpHelper.ok(response);
	}
}