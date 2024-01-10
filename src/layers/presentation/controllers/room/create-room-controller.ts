import { HttpProtocol, HttpRequest, HttpResponse, badRequest, created, unauthorized, Validate  } from "@/layers/presentation";
import { CreateRoomUseCaseProtocol, UnauthorizedError } from "@/layers/domain";

export class CreateRoomController implements HttpProtocol {

	constructor(private readonly useCase: CreateRoomUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const userId = request.userId;

		const { roomName } = request.data;

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