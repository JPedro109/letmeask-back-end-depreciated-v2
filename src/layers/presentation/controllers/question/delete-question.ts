import { 
	HttpProtocol, 
	HttpRequest, 
	HttpResponse, 
	badRequest, 
	ok,
	notFound,
	unauthorized,
	Validate
} from "@/layers/presentation";
import { DeleteQuestionUseCaseProtocol, NotFoundError, UnauthorizedError } from "@/layers/domain";

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

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ questionId, userId });

		if(response instanceof NotFoundError) return notFound(response); 

		if(response instanceof UnauthorizedError) return unauthorized(response); 

		if(response instanceof Error) return badRequest(response); 

		return ok(response);
	}
}