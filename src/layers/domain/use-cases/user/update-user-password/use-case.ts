import { UserPassword } from "@/layers/domain";
import { UserRepositoryProtocol, CryptographyProtocol, InvalidParamError, NotFoundError } from "@/layers/domain";
import { UpdateUserPasswordUseCaseProtocol } from "./protocol";
import { UpdateUserPasswordDTO, UpdateUserPasswordResponseDTO } from "./dtos";

export class UpdateUserPasswordUseCase implements UpdateUserPasswordUseCaseProtocol {

	constructor(
		private readonly repository: UserRepositoryProtocol, 
		private readonly cryptography: CryptographyProtocol
	) { }

	async execute({ id, password, newPassword, newPasswordConfirm }: UpdateUserPasswordDTO): Promise<UpdateUserPasswordResponseDTO> {
		if(newPassword !== newPasswordConfirm) return new InvalidParamError("As senhas não coincidem");

		const newUserPasswordOrError = UserPassword.create(newPassword);

		if(newUserPasswordOrError instanceof Error) return newUserPasswordOrError;
	
		const user = await this.repository.getUserById(id);

		if(!user) return new NotFoundError("Usuário não existe");

		const passwordIsMatch = await this.cryptography.compareHash(user.password, password);

		if(!passwordIsMatch) return new InvalidParamError("Senha atual incorreta");

		if(password === newUserPasswordOrError.value) return new InvalidParamError("A sua nova senha não pode ser igual a anterior");

		const hashPassword = await this.cryptography.hash(newUserPasswordOrError.value);

		await this.repository.updateUserById(id, { password: hashPassword });

		return id;
	}
}