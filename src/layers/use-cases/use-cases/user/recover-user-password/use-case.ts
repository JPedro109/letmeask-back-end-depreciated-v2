import { UserPassword } from "@/layers/entities";
import { CryptographyProtocol, UnitOfWorkProtocol, InvalidParamError, NotFoundError } from "@/layers/use-cases";
import { RecoverUserPasswordUseCaseProtocol } from "./protocol";
import { RecoverUserPasswordDTO, RecoverUserPasswordResponseDTO } from "./dtos";

export class RecoverUserPasswordUseCase implements RecoverUserPasswordUseCaseProtocol {

	constructor(
		private readonly unitOfWork: UnitOfWorkProtocol, 
		private readonly cryptography: CryptographyProtocol
	) { }

	async execute({ email, code, password, passwordConfirm }: RecoverUserPasswordDTO): Promise<RecoverUserPasswordResponseDTO> {
		const userRepository = this.unitOfWork.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWork.getUserVerificationCodeRepository();

		if(password !== passwordConfirm) return new InvalidParamError("As senhas não coincidem");

		const userPasswordOrError = UserPassword.create(password);

		if(userPasswordOrError instanceof Error) return userPasswordOrError;

		const user = await userRepository.getUserByEmailWithVerificationCode(email, code, true);

		if(!user) return new NotFoundError("Email não cadastrado"); 

		if(!user.userVerificationCode) return new InvalidParamError("Código inválido");

		if(Date.now() > user.userVerificationCode.verificationCodeExpiryDate) return new InvalidParamError("Código expirado");

		const passwordEqual = await this.cryptography.compareHash(user.password, userPasswordOrError.value);

		if(passwordEqual) return new InvalidParamError("A sua nova senha não pode ser igual a anterior");

		const hashPassword = await this.cryptography.hash(userPasswordOrError.value);

		await this.unitOfWork.transaction(async () => {
			await userRepository.updateUserByEmail(email, { password: hashPassword });
			await userVerificationCodeRepository.invalidateUserValidationCode(code);
		});

		return email;
	}
}