import { InvalidParamError, NotFoundError, UnitOfWorkProtocol } from "@/layers/use-cases";
import { UpdateUserEmailUseCaseProtocol } from "./protocol";
import { UpdateUserEmailDTO, UpdateUserEmailResponseDTO } from "./dtos";

export class UpdateUserEmailUseCase implements UpdateUserEmailUseCaseProtocol {

	constructor(private readonly unitOfWork: UnitOfWorkProtocol) { }

	async execute({ id, email, code }: UpdateUserEmailDTO): Promise<UpdateUserEmailResponseDTO> {
		const userRepository = this.unitOfWork.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWork.getUserVerificationCodeRepository();

		const user = await userRepository.getUserByIdWithVerificationCode(id, code, false);

		if(!user) return new NotFoundError("Usuário não existe");

		if(!user.userVerificationCode) return new InvalidParamError("Código inválido");

		if(Date.now() > user.userVerificationCode.verificationCodeExpiryDate) 
			return new InvalidParamError("Código expirado");

		await this.unitOfWork.transaction(async () => {
			await userRepository.updateUserById(id, { email });
			await userVerificationCodeRepository.invalidateUserValidationCode(code);
		});

		return id;
	}
}