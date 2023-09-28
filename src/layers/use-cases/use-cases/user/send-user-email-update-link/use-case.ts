import { APP_URL } from "@/shared";
import { Email } from "@/layers/entities";
import { 
	UserRepositoryProtocol,
	UserVerificationCodeRepositoryProtocol,
	GenerationProtocol, 
	MailServiceProtocol, 
	InvalidParamError, 
	NotFoundError,
	EmailBody
} from "@/layers/use-cases";
import { SendUserEmailUpdateLinkUseCaseProtocol } from "./protocol";
import { SendUserEmailUpdateLinkDTO, SendUserEmailUpdateLinkResponseDTO } from "./dtos";

export class SendUserEmailUpdateLinkUseCase implements SendUserEmailUpdateLinkUseCaseProtocol {

	constructor(
        private readonly userRepository: UserRepositoryProtocol,
        private readonly userVerificationCodeRepository: UserVerificationCodeRepositoryProtocol,
        private readonly generation: GenerationProtocol,
        private readonly mailService: MailServiceProtocol
	) { }

	async execute({ id, email }: SendUserEmailUpdateLinkDTO): Promise<SendUserEmailUpdateLinkResponseDTO> {
		const emailOrError = Email.create(email);
        
		if(emailOrError instanceof Error) return emailOrError;

		const user = await this.userRepository.getUserById(id);

		if(!user) return new NotFoundError("Usuário não existe");
	
		const emailExists = await this.userRepository.getUserByEmail(emailOrError.value);

		if(emailExists) return new InvalidParamError("Email já cadastrado");

		const verificationCode = this.generation.code();
		
		const verificationCodeExpiryDate = this.generation.codeExpirationDate(10);

		await this.userVerificationCodeRepository.createUserVerificationCode(
			verificationCode,
			verificationCodeExpiryDate,
			false,
			user.id
		);

		await this.mailService.sendMail(emailOrError.value, "Atualização de E-mail", EmailBody.UpdateEmailBody, {
			appUrl: APP_URL,
			email: emailOrError.value,
			code: verificationCode
		});

		return emailOrError.value;
	}
}