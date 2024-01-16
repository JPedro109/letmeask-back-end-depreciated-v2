import { HttpHelper, HttpProtocol, HttpRequest, HttpResponse, InvalidRequestError, Validate } from "@/layers/presentation";
import { GetRoomCodeUseCaseProtocol } from "@/layers/application";

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

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ roomCode });

		return HttpHelper.ok(response);
	}
}