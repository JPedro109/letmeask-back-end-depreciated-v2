import { User } from "@/layers/domain";
import { 
	UnitOfWorkProtocol, 
	MailProtocol, 
	InvalidParamError, 
	CryptographyProtocol, 
	GenerationProtocol,
	EmailBody,
	SecretsProtocol,
	SecretsEnum
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
		const userRepository = this.unitOfWork.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWork.getUserVerificationCodeRepository();

		if(password !== passwordConfirm) throw new InvalidParamError("As senhas não coincidem");

		if((await userRepository.getUserByEmail(email))) throw new InvalidParamError("Email já cadastrado");

		const userOrError = User.create(email, username, password);

		if(userOrError instanceof Error) throw userOrError;

		const hashPassword = await this.cryptography.hash(userOrError.userPassword.value);

		const code = this.generation.code();

		await this.unitOfWork.transaction(async () => {
			const user = await userRepository.createUser(userOrError.userEmail.value, userOrError.username.value, hashPassword);
			await userVerificationCodeRepository.createUserVerificationCode(code, 0, false, user.id);
			await this.mail.sendMail(userOrError.userEmail.value, "Criação de Usuário", EmailBody.CreateUserBody, {
				appUrl: this.secrets.getRequiredSecret(SecretsEnum.AppUrl),
				email: userOrError.userEmail.value,
				code
			});
		});

		return userOrError.userEmail.value;
	}
}