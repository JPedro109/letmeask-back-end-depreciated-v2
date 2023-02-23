import { 
	HttpProtocol, 
	HttpRequest, 
	HttpResponse, 
	badRequest, 
	ok, 
	notFound, 
	Validate, 
	unauthorized  
} from "@/layers/presentation";
import { DeleteRoomUseCaseProtocol, NotFoundError, UnauthorizedError } from "@/layers/use-cases";

export class DeleteRoomController implements HttpProtocol {

	constructor(private readonly useCase: DeleteRoomUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const userId = request.userId;

		const { roomCode } = request.params;

		const validation = Validate.fields(
			[
				{ name: "userId", type: "string" },
				{ name: "roomCode", type: "string" }
			], 
			{ userId, roomCode }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ roomCode, userId });

		if(response instanceof NotFoundError) return notFound(response); 

		if(response instanceof UnauthorizedError) return unauthorized(response); 

		if(response instanceof Error) return badRequest(response); 

		return ok(response);
	}
}