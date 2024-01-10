import { HttpProtocol, HttpRequest, HttpResponse, badRequest, ok, Validate, notFound } from "@/layers/presentation";
import { GetRoomCodeUseCaseProtocol, NotFoundError } from "@/layers/domain";

export class GetRoomCodeController implements HttpProtocol {

	constructor(private readonly useCase: GetRoomCodeUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const { roomCode } = request.data;

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