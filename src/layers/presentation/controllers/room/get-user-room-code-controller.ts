import { HttpProtocol, HttpRequest, HttpResponse, badRequest, ok, Validate } from "@/layers/presentation";
import { GetUserRoomCodeUseCaseProtocol } from "@/layers/use-cases";

export class GetUserRoomCodeController implements HttpProtocol {

	constructor(private readonly useCase: GetUserRoomCodeUseCaseProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const userId = request.userId;

		const validation = Validate.fields(
			[
				{ name: "userId", type: "string" }
			], 
			{ userId }
		);

		if(validation instanceof Error) return badRequest(validation); 

		const response = await this.useCase.execute({ userId });

		return ok(response);
	}
}