import { HttpProtocol, HttpRequest, HttpResponse, ok, RequestError, Validate } from "@/layers/presentation";
import { GetRoomCodeUseCaseProtocol } from "@/layers/domain";

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

		if(!validation.valid) throw new RequestError(validation.errors);  

		const response = await this.useCase.execute({ roomCode });

		return ok(response);
	}
}