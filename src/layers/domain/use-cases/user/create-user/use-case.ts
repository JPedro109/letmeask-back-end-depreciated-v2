import { 
	UnitOfWorkProtocol, 
	MailProtocol, 
	InvalidParamError, 
	CryptographyProtocol, 
	GenerationProtocol,
	EmailBody,
	SecretsProtocol,
	SecretsEnum,
	UserEntity,
	DomainError
} from "@/layers/domain";
import { CreateUserUseCaseProtocol } from "./protocol";
import { CreateUserDTO, CreateUserResponseDTO } from "./dtos";

export class CreateUserUseCase implements CreateUserUseCaseProtocol {

	constructor(
		private readonly unitOfWork: UnitOfWorkProtocol, 
		private readonly mail: MailProtocol,
		private readonly cryptography: CryptographyProtocol,
		private readonly generation: GenerationProtocol,
		private readonly secrets: SecretsProtocol
	) { }

	async execute({ email, username, password, passwordConfirm }: CreateUserDTO): Promise<CreateUserResponseDTO> {
		const validation = UserEntity.validate(email, username, password);

		if(validation.invalid) throw new DomainError(validation.errors);

		if(password !== passwordConfirm) throw new InvalidParamError("As senhas não coincidem");

		const userRepository = this.unitOfWork.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWork.getUserVerificationCodeRepository();

		if((await userRepository.getUserByEmail(email))) throw new InvalidParamError("Email já cadastrado");

		const hashPassword = await this.cryptography.hash(password);

		const code = this.generation.code();

		await this.unitOfWork.transaction(async () => {
			const user = await userRepository.createUser(email, username, hashPassword);
			await userVerificationCodeRepository.createUserVerificationCode(code, 0, false, user.id);
			await this.mail.sendMail(email, "Criação de Usuário", EmailBody.CreateUserBody, {
				appUrl: this.secrets.getRequiredSecret(SecretsEnum.AppUrl),
				email,
				code
			});
		});

		return email;
	}
}