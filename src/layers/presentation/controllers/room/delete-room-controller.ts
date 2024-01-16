import { HttpProtocol, HttpRequest, HttpResponse, HttpHelper, Validate, InvalidRequestError } from "@/layers/presentation";
import { DeleteRoomUseCaseProtocol } from "@/layers/application";

export class DeleteRoomController implements HttpProtocol {

	constructor(private readonly useCase: DeleteRoomUseCaseProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const userId = request.userId;

		const { roomCode } = request.data;

		const validation = Validate.fields(
			[
				{ name: "userId", type: "string" },
				{ name: "roomCode", type: "string" }
			], 
			{ userId, roomCode }
		);

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ roomCode, userId });

		return HttpHelper.ok(response);
	}
}