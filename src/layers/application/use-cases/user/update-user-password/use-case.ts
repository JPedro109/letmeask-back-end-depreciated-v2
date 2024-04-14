import { UserPassword } from "@/layers/domain";
import { UserRepositoryProtocol, CryptographyProtocol, InvalidParamError, NotFoundError } from "@/layers/application";
import { UpdateUserPasswordUseCaseProtocol } from "./protocol";
import { UpdateUserPasswordDTO, UpdateUserPasswordResponseDTO } from "./dtos";

export class UpdateUserPasswordUseCase implements UpdateUserPasswordUseCaseProtocol {

	constructor(
		private readonly repository: UserRepositoryProtocol, 
		private readonly cryptography: CryptographyProtocol
	) { }

	async execute({ id, password, newPassword, newPasswordConfirm }: UpdateUserPasswordDTO): Promise<UpdateUserPasswordResponseDTO> {
		const newPasswordOrError = UserPassword.create(newPassword);

		if(newPasswordOrError instanceof Error) throw newPasswordOrError;

		if(newPasswordOrError.value !== newPasswordConfirm) throw new InvalidParamError("As senhas não coincidem");
	
		const user = await this.repository.getUserById(id);

		if(!user) throw new NotFoundError("Usuário não existe");

		const passwordIsMatch = await this.cryptography.compareHash(user.password, password);

		if(!passwordIsMatch) throw new InvalidParamError("Senha atual incorreta");

		if(password === newPasswordOrError.value) throw new InvalidParamError("A sua nova senha não pode ser igual a anterior");

		const hashPassword = await this.cryptography.hash(newPasswordOrError.value);

		await this.repository.updateUserById(id, { password: hashPassword });

		return id;
	}
}