import { APP_URL } from "@/shared";
import { 
	GenerationProtocol, 
	MailProtocol, 
	UserRepositoryProtocol, 
	NotFoundError, 
	UserVerificationCodeRepositoryProtocol, 
	EmailBody
} from "@/layers/use-cases";
import { SendUserPasswordRecoveryLinkUseCaseProtocol } from "./protocol";
import { SendUserPasswordRecoveryLinkDTO, SendUserPasswordRecoveryLinkResponseDTO } from "./dtos";

export class SendUserPasswordRecoveryLinkUseCase implements SendUserPasswordRecoveryLinkUseCaseProtocol {

	constructor(
		private readonly userRepository: UserRepositoryProtocol,
        private readonly userVerificationCodeRepository: UserVerificationCodeRepositoryProtocol,
        private readonly generation: GenerationProtocol,
        private readonly mail: MailProtocol,
	) { } 

	async execute({ email }: SendUserPasswordRecoveryLinkDTO): Promise<SendUserPasswordRecoveryLinkResponseDTO> {
		const user = await this.userRepository.getUserByEmail(email);

		if(!user) return new NotFoundError("Email não cadastrado");

		const verificationCode = this.generation.code();
		
		const verificationTokenExpiryDate = this.generation.codeExpirationDate(10);

		await this.userVerificationCodeRepository.createUserVerificationCode(
			verificationCode,
			verificationTokenExpiryDate,
			true,
			user.id
		);

		await this.mail.sendMail(email, "Recuperação de Senha", EmailBody.RecoverPasswordBody, {
			appUrl: APP_URL,
			email: email,
			code: verificationCode
		});

		return email;
	}
}