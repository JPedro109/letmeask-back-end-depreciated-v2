import { HttpHelper, HttpProtocol, HttpRequest, HttpResponse, InvalidRequestError, Validate } from "@/layers/presentation";
import {  UserVerifyEmailUseCaseProtocol } from "@/layers/domain";

export class UserVerifyEmailController implements HttpProtocol {

	constructor(private readonly useCase: UserVerifyEmailUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const { email, code } = request.data;

		const validation = Validate.fields(
			[
				{ name: "email", type: "string" }, 
				{ name: "code", type: "string" },
			], 
			{ email, code }
		);

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ email, code });

		return HttpHelper.ok(response);
	}
}