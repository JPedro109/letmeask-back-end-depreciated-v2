import { UserRepositoryProtocol, InvalidParamError, NotFoundError, UnauthorizedError } from "@/layers/domain";
import { UserVerifyEmailUseCaseProtocol } from "./protocol";
import { UserVerifyEmailDTO, UserVerifyEmailResponseDTO } from "./dtos";

export class UserVerifyEmailUseCase implements UserVerifyEmailUseCaseProtocol {

	constructor(private readonly repository: UserRepositoryProtocol) { }

	async execute({ email, code }: UserVerifyEmailDTO): Promise<UserVerifyEmailResponseDTO> {
		const user = await this.repository.getUserByEmailWithVerificationCode(email, code, false);

		if (!user) throw new NotFoundError("Email não cadastrado");

		if (user.verifiedEmail) throw new UnauthorizedError("Email já verificado");

		if (!user.userVerificationCode)
			throw new InvalidParamError("Código inválido");

		await this.repository.updateUserByEmail(email, {
			verifiedEmail: true,
		});

		return email;
	}
}