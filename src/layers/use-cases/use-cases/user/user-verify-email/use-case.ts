import { UserRepositoryProtocol, InvalidParamError, NotFoundError, UnauthorizedError } from "@/layers/use-cases";
import { UserVerifyEmailUseCaseProtocol } from "./protocol";
import { UserVerifyEmailDTO, UserVerifyEmailResponseDTO } from "./dtos";

export class UserVerifyEmailUseCase implements UserVerifyEmailUseCaseProtocol {

	constructor(private readonly repository: UserRepositoryProtocol) { }

	async execute({ email, code }: UserVerifyEmailDTO): Promise<UserVerifyEmailResponseDTO> {
		const user = await this.repository.getUserByEmailWithVerificationCode(email, code, false);

		if (!user) return new NotFoundError("Email não cadastrado");

		if (user.verifiedEmail) return new UnauthorizedError("Email já verificado");

		if (!user.userVerificationCode)
			return new InvalidParamError("Código inválido");

		await this.repository.updateUserByEmail(email, {
			verifiedEmail: true,
		});

		return email;
	}
}