import { UserEmail } from "@/layers/entities";
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
} from "@/layers/use-cases";
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
		const userEmailOrError = UserEmail.create(email);
        
		if(userEmailOrError instanceof Error) return userEmailOrError;

		const user = await this.userRepository.getUserById(id);

		if(!user) return new NotFoundError("Usuário não existe");
	
		const emailExists = await this.userRepository.getUserByEmail(userEmailOrError.value);

		if(emailExists) return new InvalidParamError("Email já cadastrado");

		const verificationCode = this.generation.code();
		
		const verificationCodeExpiryDate = this.generation.codeExpirationDate(10);

		await this.userVerificationCodeRepository.createUserVerificationCode(
			verificationCode,
			verificationCodeExpiryDate,
			false,
			user.id
		);

		await this.mail.sendMail(userEmailOrError.value, "Atualização de E-mail", EmailBody.UpdateEmailBody, {
			appUrl: this.secrets.getRequiredSecret(SecretsEnum.AppUrl),
			email: userEmailOrError.value,
			code: verificationCode
		});

		return userEmailOrError.value;
	}
}