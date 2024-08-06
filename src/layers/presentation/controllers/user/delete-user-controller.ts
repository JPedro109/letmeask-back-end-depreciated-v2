import { HttpHelper, HttpProtocol, HttpRequest, HttpResponse, InvalidRequestError, Validate } from "@/layers/presentation";
import { DeleteUserUseCaseProtocol } from "@/layers/application";

export class DeleteUserController implements HttpProtocol {

	constructor(private readonly useCase: DeleteUserUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;		

		const { password, passwordConfirm } = request.data;

		const validation = Validate.fields(
			[
				{ name: "id", type: "string" }, 
				{ name: "password", type: "string" }, 
				{ name: "passwordConfirm", type: "string" }
			], 
			{ id, password, passwordConfirm }
		);

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ id, password, passwordConfirm });

		return HttpHelper.ok(response);
	}
}