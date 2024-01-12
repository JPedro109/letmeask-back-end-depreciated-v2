import { UserRepositoryProtocol, CryptographyProtocol, InvalidParamError, NotFoundError, UserValidate, DomainError } from "@/layers/domain";
import { UpdateUserPasswordUseCaseProtocol } from "./protocol";
import { UpdateUserPasswordDTO, UpdateUserPasswordResponseDTO } from "./dtos";

export class UpdateUserPasswordUseCase implements UpdateUserPasswordUseCaseProtocol {

	constructor(
		private readonly repository: UserRepositoryProtocol, 
		private readonly cryptography: CryptographyProtocol
	) { }

	async execute({ id, password, newPassword, newPasswordConfirm }: UpdateUserPasswordDTO): Promise<UpdateUserPasswordResponseDTO> {
		const validation = UserValidate.password(newPassword);

		if(validation.invalid) throw new DomainError(validation.error);

		if(newPassword !== newPasswordConfirm) throw new InvalidParamError("As senhas não coincidem");
	
		const user = await this.repository.getUserById(id);

		if(!user) throw new NotFoundError("Usuário não existe");

		const passwordIsMatch = await this.cryptography.compareHash(user.password, password);

		if(!passwordIsMatch) throw new InvalidParamError("Senha atual incorreta");

		if(password === newPassword) throw new InvalidParamError("A sua nova senha não pode ser igual a anterior");

		const hashPassword = await this.cryptography.hash(newPassword);

		await this.repository.updateUserById(id, { password: hashPassword });

		return id;
	}
}