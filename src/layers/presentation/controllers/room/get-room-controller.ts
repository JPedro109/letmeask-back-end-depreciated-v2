import { HttpProtocol, HttpRequest, HttpResponse, ok, RequestError, Validate } from "@/layers/presentation";
import { GetRoomUseCaseProtocol } from "@/layers/domain";

export class GetRoomController implements HttpProtocol {

	constructor(private readonly useCase: GetRoomUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const { roomCode } = request.data;

		const validation = Validate.fields(
			[
				{ name: "roomCode", type: "string" }
			], 
			{ roomCode }
		);

		if(!validation.valid) throw new RequestError(validation.errors);  

		const response = await this.useCase.execute({ roomCode });

		return ok(response);
	}
}