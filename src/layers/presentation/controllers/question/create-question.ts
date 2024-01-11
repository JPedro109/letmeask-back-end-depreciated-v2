import { HttpProtocol, HttpRequest, HttpResponse, created, Validate, RequestError } from "@/layers/presentation";
import { CreateQuestionUseCaseProtocol } from "@/layers/domain";

export class CreateQuestionController implements HttpProtocol {

	constructor(private readonly useCase: CreateQuestionUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const userId = request.userId;

		const { roomCode, question } = request.data;

		const validation = Validate.fields(
			[
				{ name: "userId", type: "string" },
				{ name: "roomCode", type: "string" },
				{ name: "question", type: "string" }
			], 
			{ userId, roomCode, question }
		);

		if(!validation.valid) throw new RequestError(validation.errors);  

		const response = await this.useCase.execute({ userId, roomCode, question });

		return created(response);
	}
}