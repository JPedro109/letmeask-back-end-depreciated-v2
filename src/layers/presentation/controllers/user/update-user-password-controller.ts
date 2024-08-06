import { HttpHelper, HttpProtocol, HttpRequest, HttpResponse, InvalidRequestError, Validate } from "@/layers/presentation";
import { UpdateUserPasswordUseCaseProtocol } from "@/layers/application";

export class UpdateUserPasswordController implements HttpProtocol {

	constructor(private readonly useCase: UpdateUserPasswordUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;

		const { password, newPassword, newPasswordConfirm } = request.data;

		const validation = Validate.fields(
			[
				{ name: "id", type: "string" }, 
				{ name: "password", type: "string" }, 
				{ name: "newPassword", type: "string" },
				{ name: "newPasswordConfirm", type: "string" },
			], 
			{ id, password, newPassword, newPasswordConfirm }
		);

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ id, password, newPassword, newPasswordConfirm });

		return HttpHelper.ok(response);
	}
}