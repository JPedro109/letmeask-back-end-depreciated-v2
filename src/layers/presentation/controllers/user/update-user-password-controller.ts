import { HttpProtocol, HttpRequest, HttpResponse, badRequest, ok, Validate } from "@/layers/presentation";
import { UpdateUserPasswordUseCaseProtocol } from "@/layers/use-cases";

export class UpdateUserPasswordController implements HttpProtocol {

	constructor(private readonly useCase: UpdateUserPasswordUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const id = request.userId;

		const { password, newPassword, newPasswordConfirm } = request.body;

		const validation = Validate.fields(
			[
				{ name: "id", type: "string" }, 
				{ name: "password", type: "string" }, 
				{ name: "newPassword", type: "string" },
				{ name: "newPasswordConfirm", type: "string" },
			], 
			{ id, password, newPassword, newPasswordConfirm }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ id, password, newPassword, newPasswordConfirm });

		if(response instanceof Error) return badRequest(response);

		return ok(response);
	}
}