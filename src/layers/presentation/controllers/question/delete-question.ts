import { HttpHelper, HttpProtocol, HttpRequest, HttpResponse, InvalidRequestError, Validate } from "@/layers/presentation";
import { DeleteQuestionUseCaseProtocol } from "@/layers/application";

export class DeleteQuestionController implements HttpProtocol {

	constructor(private readonly useCase: DeleteQuestionUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const userId = request.userId;

		const { questionId } = request.data;

		const validation = Validate.fields(
			[
				{ name: "userId", type: "string" },
				{ name: "questionId", type: "string" }
			], 
			{ userId, questionId }
		);

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ questionId, userId });

		return HttpHelper.ok(response);
	}
}