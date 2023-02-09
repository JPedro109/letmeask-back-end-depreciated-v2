import { APP_URL } from "@/shared";
import { 
	GenerationProtocol, 
	MailServiceProtocol, 
	UserRepositoryProtocol, 
	NotFoundError, 
	UserVerificationCodeRepositoryProtocol 
} from "@/layers/use-cases";
import { SendUserPasswordRecoveryLinkUseCaseProtocol } from "./protocol";
import { SendUserPasswordRecoveryLinkDTO, SendUserPasswordRecoveryLinkResponseDTO } from "./dtos";

export class SendUserPasswordRecoveryLinkUseCase implements SendUserPasswordRecoveryLinkUseCaseProtocol {

	constructor(
		private readonly userRepository: UserRepositoryProtocol,
        private readonly userVerificationCodeRepository: UserVerificationCodeRepositoryProtocol,
        private readonly generation: GenerationProtocol,
        private readonly mailService: MailServiceProtocol,
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

		await this.mailService.sendMail(email, "Recuperação de Senha", "recover-password-body", {
			appUrl: APP_URL,
			email: email,
			code: verificationCode
		});

		return email;
	}
}