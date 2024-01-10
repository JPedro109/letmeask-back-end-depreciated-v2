import { HttpProtocol, HttpRequest, HttpResponse, badRequest, created, notFound, unauthorized, Validate  } from "@/layers/presentation";
import { CreateResponseUseCaseProtocol, NotFoundError, UnauthorizedError } from "@/layers/domain";

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

		if(validation instanceof Error) return badRequest(validation); 

		const useCaseResponse = await this.useCase.execute({ userId, questionId, response });

		if(useCaseResponse instanceof NotFoundError) return notFound(useCaseResponse);

		if(useCaseResponse instanceof UnauthorizedError) return unauthorized(useCaseResponse);

		if(useCaseResponse instanceof Error) return badRequest(useCaseResponse);

		return created(useCaseResponse);
	}
}