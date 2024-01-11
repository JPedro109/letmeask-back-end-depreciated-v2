import {  HttpProtocol, HttpRequest, HttpResponse, ok, Validate, RequestError } from "@/layers/presentation";
import { GetUserQuestionsUseCaseProtocol } from "@/layers/domain";

export class GetUserQuestionsController implements HttpProtocol {

	constructor(private readonly useCase: GetUserQuestionsUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const userId = request.userId;

		const validation = Validate.fields(
			[
				{ name: "userId", type: "string" },
			], 
			{ userId }
		);

		if(!validation.valid) throw new RequestError(validation.errors);  

		const response = await this.useCase.execute({ userId });

		return ok(response);
	}
}