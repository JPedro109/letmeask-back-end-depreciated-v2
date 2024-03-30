import { HttpProtocol, HttpRequest, HttpResponse, Validate, InvalidRequestError, HttpHelper  } from "@/layers/presentation";
import { CreateRoomUseCaseProtocol } from "@/layers/application";

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

		if(!validation.valid) throw new InvalidRequestError(validation.errors);  

		const response = await this.useCase.execute({ userId, roomName });

		return HttpHelper.created(response);
	}
}