import { 
	UserRepositoryProtocol,
	UserVerificationCodeRepositoryProtocol,
	GenerationProtocol, 
	MailProtocol, 
	InvalidParamError, 
	NotFoundError,
	EmailBody,
	SecretsProtocol,
	SecretsEnum
} from "@/layers/application";
import { SendUserEmailUpdateLinkUseCaseProtocol } from "./protocol";
import { SendUserEmailUpdateLinkDTO, SendUserEmailUpdateLinkResponseDTO } from "./dtos";

export class SendUserEmailUpdateLinkUseCase implements SendUserEmailUpdateLinkUseCaseProtocol {

	constructor(
        private readonly userRepository: UserRepositoryProtocol,
        private readonly userVerificationCodeRepository: UserVerificationCodeRepositoryProtocol,
        private readonly generation: GenerationProtocol,
        private readonly mail: MailProtocol,
		private readonly secrets: SecretsProtocol
	) { }

	async execute({ id, email }: SendUserEmailUpdateLinkDTO): Promise<SendUserEmailUpdateLinkResponseDTO> {
		const user = await this.userRepository.getUserById(id);

		if(!user) throw new NotFoundError("Usuário não existe");
	
		const emailExists = await this.userRepository.getUserByEmail(email);

		if(emailExists) throw new InvalidParamError("Email já cadastrado");

		const verificationCode = this.generation.code();
		
		const verificationCodeExpiryDate = this.generation.codeExpirationDate(10);

		await this.userVerificationCodeRepository.createUserVerificationCode(
			verificationCode,
			verificationCodeExpiryDate,
			false,
			user.id
		);

		await this.mail.sendMail(email, "Atualização de E-mail", EmailBody.UpdateEmailBody, {
			appUrl: this.secrets.getRequiredSecret(SecretsEnum.AppUrl),
			email,
			code: verificationCode
		});

		return email;
	}
}