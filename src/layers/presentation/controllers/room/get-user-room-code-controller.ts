import { HttpProtocol, HttpRequest, HttpResponse, HttpHelper, Validate, InvalidRequestError } from "@/layers/presentation";
import { GetUserRoomCodeUseCaseProtocol } from "@/layers/application";

export class GetUserRoomCodeController implements HttpProtocol {

	constructor(private readonly useCase: GetUserRoomCodeUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const userId = request.userId;

		const validation = Validate.fields(
			[
				{ name: "userId", type: "string" }
			], 
			{ userId }
		);

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ userId });

		return HttpHelper.ok(response);
	}
}