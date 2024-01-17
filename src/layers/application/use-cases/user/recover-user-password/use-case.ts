import { DomainError, UserValidate } from "@/layers/domain";
import { CryptographyProtocol, UnitOfWorkProtocol, InvalidParamError, NotFoundError } from "@/layers/application";
import { RecoverUserPasswordUseCaseProtocol } from "./protocol";
import { RecoverUserPasswordDTO, RecoverUserPasswordResponseDTO } from "./dtos";

export class RecoverUserPasswordUseCase implements RecoverUserPasswordUseCaseProtocol {

	constructor(
		private readonly unitOfWork: UnitOfWorkProtocol, 
		private readonly cryptography: CryptographyProtocol
	) { }

	async execute({ email, code, password, passwordConfirm }: RecoverUserPasswordDTO): Promise<RecoverUserPasswordResponseDTO> {
		const validation = UserValidate.password(password);

		if(validation.invalid) throw new DomainError(validation.error);

		if(password !== passwordConfirm) throw new InvalidParamError("As senhas não coincidem");

		const userRepository = this.unitOfWork.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWork.getUserVerificationCodeRepository();

		const user = await userRepository.getUserByEmailWithVerificationCode(email, code, true);

		if(!user) throw new NotFoundError("Email não cadastrado"); 

		if(!user.userVerificationCode) throw new InvalidParamError("Código inválido");

		if(Date.now() > user.userVerificationCode.verificationCodeExpiryDate) throw new InvalidParamError("Código expirado");

		const passwordEqual = await this.cryptography.compareHash(user.password, password);

		if(passwordEqual) throw new InvalidParamError("A sua nova senha não pode ser igual a anterior");

		const hashPassword = await this.cryptography.hash(password);

		await this.unitOfWork.transaction(async () => {
			await userRepository.updateUserByEmail(email, { password: hashPassword });
			await userVerificationCodeRepository.invalidateUserValidationCode(code);
		});

		return email;
	}
}