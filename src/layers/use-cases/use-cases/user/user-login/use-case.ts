import { CryptographyProtocol, AuthenticationProtocol, UserRepositoryProtocol, UnauthorizedError } from "@/layers/use-cases";
import { UserLoginUseCaseProtocol } from "./protocol";
import { UserLoginDTO, UserLoginResponseDTO } from "./dtos";

export class UserLoginUseCase implements UserLoginUseCaseProtocol {

	constructor(
		private repository: UserRepositoryProtocol,
		private cryptography: CryptographyProtocol,
		private jsonWebToken: AuthenticationProtocol
	) { }

	async execute({ email, password }: UserLoginDTO): Promise<UserLoginResponseDTO> {
		const user = await this.repository.getUserByEmail(email);

		if(!user) return new UnauthorizedError("Email não cadastrado");

		const passwordIsEqual = await this.cryptography.compareHash(user.password, password);

		if(!passwordIsEqual) return new UnauthorizedError("Email ou senha incorreto(s)");

		if(!user.verifiedEmail) return new UnauthorizedError("Email não está verificado");

		return this.jsonWebToken.createJsonWebToken({ id: user.id, email }, 86400);
	}
}