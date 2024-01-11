import { AuthenticationProtocol, UnauthorizedError } from "@/layers/domain";
import { HttpProtocol, HttpRequest, HttpResponse, HttpHelper } from "@/layers/presentation";

export class AuthUserMiddleware implements HttpProtocol {

	constructor(private readonly jsonWebToken: AuthenticationProtocol) { }

	async http(request: HttpRequest): Promise<HttpResponse> {
		const { authorization } = request.headers;

		if (!authorization) return HttpHelper.unauthorized(new UnauthorizedError("Você não está logado"));
    
		const [bearer, token] = authorization.split(" ");

		if(bearer !== "Bearer") return HttpHelper.unauthorized(new UnauthorizedError("Código inválido"));
    
		const decode = this.jsonWebToken.verifyJsonWebToken(token);

		if(decode instanceof Error) return HttpHelper.unauthorized(decode);

		request.userId = decode.id as string;

		return HttpHelper.noBody();
	}
}