import { AuthenticationProtocol, UnauthorizedError } from "@/layers/use-cases";
import { HttpProtocol, HttpRequest, HttpResponse, ok, unauthorized } from "@/layers/presentation";

export class AuthenticateUserMiddleware implements HttpProtocol {

	constructor(private readonly jsonWebToken: AuthenticationProtocol) { }

	async handle(request: HttpRequest): Promise<HttpResponse> {
		const { authorization } = request.headers;

		if (!authorization) return unauthorized(new UnauthorizedError("Você não está logado"));
    
		const [bearer, token] = authorization.split(" ");

		if(bearer !== "Bearer") return unauthorized(new UnauthorizedError("Código inválido"));
    
		const decode = this.jsonWebToken.verifyJsonWebToken(token);

		if(decode instanceof Error) return unauthorized(decode);

		return ok(decode.id as string);
	}
}