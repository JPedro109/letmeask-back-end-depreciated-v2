import { 
	GenerationProtocol, 
	MailProtocol, 
	UserRepositoryProtocol, 
	NotFoundError, 
	UserVerificationCodeRepositoryProtocol, 
	EmailBody,
	SecretsProtocol,
	SecretsEnum
} from "@/layers/application";
import { SendUserPasswordRecoveryLinkUseCaseProtocol } from "./protocol";
import { SendUserPasswordRecoveryLinkDTO, SendUserPasswordRecoveryLinkResponseDTO } from "./dtos";

export class SendUserPasswordRecoveryLinkUseCase implements SendUserPasswordRecoveryLinkUseCaseProtocol {

	constructor(
		private readonly userRepository: UserRepositoryProtocol,
        private readonly userVerificationCodeRepository: UserVerificationCodeRepositoryProtocol,
        private readonly generation: GenerationProtocol,
        private readonly mail: MailProtocol,
		private readonly secrets: SecretsProtocol
	) { } 

	async execute({ email }: SendUserPasswordRecoveryLinkDTO): Promise<SendUserPasswordRecoveryLinkResponseDTO> {
		const user = await this.userRepository.getUserByEmail(email);

		if(!user) throw new NotFoundError("Email não cadastrado");

		const verificationCode = this.generation.code();
		
		const verificationTokenExpiryDate = this.generation.codeExpirationDate(10);

		await this.userVerificationCodeRepository.createUserVerificationCode(
			verificationCode,
			verificationTokenExpiryDate,
			true,
			user.id
		);

		await this.mail.sendMail(email, "Recuperação de Senha", EmailBody.RecoverPasswordBody, {
			appUrl: this.secrets.getRequiredSecret(SecretsEnum.AppUrl),
			email: email,
			code: verificationCode
		});

		return email;
	}
}