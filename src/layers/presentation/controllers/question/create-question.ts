import { 
	HttpProtocol, 
	HttpRequest, 
	HttpResponse, 
	badRequest, 
	created,
	notFound,
	unauthorized,
	Validate  
} from "@/layers/presentation";
import { CreateQuestionUseCaseProtocol, NotFoundError, UnauthorizedError } from "@/layers/use-cases";

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

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ userId, roomCode, question });

		if(response instanceof NotFoundError) return notFound(response); 

		if(response instanceof UnauthorizedError) return unauthorized(response); 

		if(response instanceof Error) return badRequest(response); 

		return created(response);
	}
}