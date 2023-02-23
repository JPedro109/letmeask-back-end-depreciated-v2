import { HttpProtocol, HttpRequest, HttpResponse, badRequest, created, unauthorized, Validate  } from "@/layers/presentation";
import { CreateRoomUseCaseProtocol, UnauthorizedError } from "@/layers/use-cases";

export class CreateRoomController implements HttpProtocol {

	constructor(private readonly useCase: CreateRoomUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const userId = request.userId;

		const { roomName } = request.body;

		const validation = Validate.fields(
			[
				{ name: "userId", type: "string" },
				{ name: "roomName", type: "string" }
			], 
			{ userId, roomName }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ userId, roomName });

		if(response instanceof Error) return response instanceof UnauthorizedError ? unauthorized(response) : badRequest(response); 

		return created(response);
	}
}