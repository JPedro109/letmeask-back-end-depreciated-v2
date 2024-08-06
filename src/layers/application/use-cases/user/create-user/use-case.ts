import { UserEntity } from "@/layers/domain";
import { 
	UnitOfWorkProtocol, 
	MailProtocol, 
	InvalidParamError, 
	CryptographyProtocol, 
	GenerationProtocol,
	EmailBody,
	SecretsProtocol,
	SecretsEnum
} from "@/layers/application";
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
		const user = UserEntity.create({
			email,
			username,
			password,
			verifiedEmail: false
		});

		if(password !== passwordConfirm) throw new InvalidParamError("As senhas não coincidem");

		const userRepository = this.unitOfWork.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWork.getUserVerificationCodeRepository();

		if((await userRepository.getUserByEmail(user.email))) throw new InvalidParamError("Email já cadastrado");

		const hashPassword = await this.cryptography.hash(user.password);

		const code = this.generation.code();

		await this.unitOfWork.transaction(async () => {
			const userCreated = await userRepository.createUser(user.email, user.username, hashPassword);
			await userVerificationCodeRepository.createUserVerificationCode(code, 0, false, userCreated.id);
			await this.mail.sendMail(email, "Criação de Usuário", EmailBody.CreateUserBody, {
				appUrl: this.secrets.getRequiredSecret(SecretsEnum.AppUrl),
				email,
				code
			});
		});

		return email;
	}
}