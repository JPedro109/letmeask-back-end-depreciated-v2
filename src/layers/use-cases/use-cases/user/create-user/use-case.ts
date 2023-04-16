import { APP_URL } from "@/shared";
import { User } from "@/layers/entities";
import { 
	UnitOfWorkProtocol, 
	MailServiceProtocol, 
	InvalidParamError, 
	CryptographyProtocol, 
	GenerationProtocol
} from "@/layers/use-cases";
import { CreateUserUseCaseProtocol } from "./protocol";
import { CreateUserDTO, CreateUserResponseDTO } from "./dtos";

export class CreateUserUseCase implements CreateUserUseCaseProtocol {

	constructor(
		private readonly unitOfWork: UnitOfWorkProtocol, 
		private readonly mailService: MailServiceProtocol,
		private readonly cryptography: CryptographyProtocol,
		private readonly generation: GenerationProtocol
	) { }

	async execute({ email, username, password, passwordConfirm }: CreateUserDTO): Promise<CreateUserResponseDTO> {
		const userRepository = this.unitOfWork.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWork.getUserVerificationCodeRepository();

		if(password !== passwordConfirm) return new InvalidParamError("As senhas não coincidem");

		if((await userRepository.getUserByEmail(email))) return new InvalidParamError("Email já cadastrado");

		const userOrError = User.create(email, username, password);

		if(userOrError instanceof Error) return userOrError;

		const hashPassword = await this.cryptography.hash(userOrError.password.value);

		const code = this.generation.code();

		await this.unitOfWork.transaction(async () => {
			const user = await userRepository.createUser(userOrError.email.value, userOrError.username.value, hashPassword);
			await userVerificationCodeRepository.createUserVerificationCode(code, 0, false, user.id);
			await this.mailService.sendMail(userOrError.email.value, "Criação de Usuário", "create-user-body", {
				appUrl: APP_URL,
				email: userOrError.email.value,
				code
			});
		});

		return userOrError.email.value;
	}
}