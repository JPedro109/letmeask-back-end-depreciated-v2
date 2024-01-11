import { HttpProtocol, HttpRequest, HttpResponse, created, Validate, RequestError  } from "@/layers/presentation";
import { CreateResponseUseCaseProtocol } from "@/layers/domain";

export class CreateResponseController implements HttpProtocol {

	constructor(private readonly useCase: CreateResponseUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const userId = request.userId;
        
		const { questionId, response } = request.data;

		const validation = Validate.fields(
			[
				{ name: "userId", type: "string" }, 
				{ name: "questionId", type: "string" },
				{ name: "response", type: "string" }, 
			], 
			{ userId, questionId, response }
		);

		if(!validation.valid) throw new RequestError(validation.errors);  

		const useCaseResponse = await this.useCase.execute({ userId, questionId, response });

		return created(useCaseResponse);
	}
}