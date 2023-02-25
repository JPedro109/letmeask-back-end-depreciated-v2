import { HttpProtocol, HttpRequest, HttpResponse, badRequest, notFound, ok, Validate } from "@/layers/presentation";
import { GetRoomUseCaseProtocol, NotFoundError } from "@/layers/use-cases";

export class GetRoomController implements HttpProtocol {

	constructor(private readonly useCase: GetRoomUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const { roomCode } = request.params;

		const validation = Validate.fields(
			[
				{ name: "roomCode", type: "string" }
			], 
			{ roomCode }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ roomCode });

		if(response instanceof Error) return response instanceof NotFoundError ? notFound(response) : badRequest(response); 

		return ok(response);
	}
}